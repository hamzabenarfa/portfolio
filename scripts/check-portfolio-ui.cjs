// Run against a running dev/production server: PORTFOLIO_URL=http://localhost:3003 node scripts/check-portfolio-ui.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require('playwright-core');

(async () => {
  const base = process.env.PORTFOLIO_URL || 'http://localhost:3003';
  const executablePath = process.env.CHROME_PATH || '/opt/google/chrome/chrome';
  const output = process.env.PORTFOLIO_SCREENSHOTS || '/tmp/portfolio-ui-check';
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', (error) => errors.push(error.message));
    console.log('Checking homepage structure and first-visit intro…');
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('h1').getAttribute('aria-label'), 'Hamza Benarfa');
    assert.equal(await page.locator('.panel').count(), 3);
    // The intro curtain lifts and the name animates in.
    await page.waitForFunction(() => !document.documentElement.classList.contains('intro'), null, { timeout: 6000 });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-name')).opacity === '1', null, { timeout: 6000 });
    assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('.tile-curtain')).visibility), 'hidden');

    console.log('Checking responsive layouts and mobile navigation…');
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Horizontal overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation', exact: true });
    assert.equal(await dialog.isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Close');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'mailto:contact@benarfa.com');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Close');
    await page.keyboard.press('Escape');
    assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.textContent), 'Menu');
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await dialog.getByRole('link', { name: 'Services', exact: true }).click();
    await page.waitForFunction(() => Math.abs(document.getElementById('services').getBoundingClientRect().top) < 120);
    assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '');

    console.log('Checking FAQ, contact and linked pages…');
    const question = page.getByRole('button', { name: 'Can you handle frontend AND backend?', exact: false });
    await question.click();
    assert.equal(await question.getAttribute('aria-expanded'), 'true');
    const answer = page.locator(`#${await question.getAttribute('aria-controls')}`);
    assert.equal(await answer.getAttribute('aria-hidden'), 'false');
    assert.match(await answer.innerText(), /full stack/);
    await question.click();
    assert.equal(await answer.getAttribute('aria-hidden'), 'true');
    assert.equal(await page.locator('.contact-email').getAttribute('href'), 'mailto:contact@benarfa.com');

    for (const path of ['/work', '/background', '/work/dtalk-ecosystem', '/work/beadcraft', '/work/autopart', '/work/menu-qr', '/benarfa-hamza-en.pdf']) {
      const result = await page.request.get(`${base}${path}`);
      assert.equal(result.status(), 200, `Route ${path}`);
    }

    console.log('Checking the tile-curtain page transition…');
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${base}/work`, { waitUntil: 'networkidle' });
    await page.click('.header-nav a[href="/background"]');
    await page.waitForURL('**/background', { timeout: 8000 });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.tile-curtain')).visibility === 'hidden', null, { timeout: 6000 });
    assert.equal(await page.locator('h1').innerText(), 'Background');

    console.log('Checking reduced motion and capturing screenshots…');
    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
    reduced.on('pageerror', (error) => errors.push(error.message));
    await reduced.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await reduced.evaluate(() => document.documentElement.classList.contains('motion')), false);
    assert.equal(await reduced.evaluate(() => getComputedStyle(document.querySelector('.hero-name')).opacity), '1');
    assert.equal(await reduced.evaluate(() => getComputedStyle(document.querySelector('.tile-curtain-static')).visibility), 'hidden');
    assert.equal(await reduced.evaluate(() => !!window.__lenis), false);
    // Mosaic overlays never engage, so the real images show.
    assert.equal(await reduced.locator('.mosaic-image[data-resolved]').count(), 0);
    for (const img of await reduced.locator('.mosaic-image img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((el) => el.decode());
    }
    await reduced.evaluate(() => window.scrollTo(0, 0));
    await reduced.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
    await reduced.screenshot({ path: `${output}/desktop-hero.png` });
    await reduced.setViewportSize({ width: 390, height: 844 });
    await reduced.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
    await reduced.screenshot({ path: `${output}/mobile-hero.png` });
    await reduced.getByRole('button', { name: 'Menu', exact: true }).click();
    await reduced.screenshot({ path: `${output}/mobile-menu.png` });
    assert.deepEqual(errors, [], 'Browser runtime errors');
    console.log('PASS: intro curtain, 7 viewport widths, mobile focus trap/Escape/anchor navigation, FAQ toggle, 7 routes, contact, page transition, reduced motion, images, and browser runtime.');
    console.log(`Screenshots: ${output}`);
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
