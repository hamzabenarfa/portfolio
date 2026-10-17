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
    console.log('Checking homepage and preview controls…');
    const response = await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.project-tile').count(), 4);

    await page.getByRole('button', { name: 'Next project preview', exact: true }).click();
    assert.match(await page.locator('.showcase-caption').innerText(), /D-Talk/);
    assert.equal(await page.getByRole('button', { name: 'Preview D-Talk Ecosystem', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'Preview Menu QR', exact: true }).focus();
    await page.keyboard.press('Enter');
    assert.match(await page.locator('.showcase-image').getAttribute('href'), /menu-qr/);
    await page.getByRole('button', { name: 'Next project preview', exact: true }).click();
    assert.match(await page.locator('.showcase-caption').innerText(), /BeadCraft/);

    console.log('Checking responsive layouts and mobile navigation…');
    for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `Horizontal overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Navigation', exact: true });
    assert.equal(await dialog.isVisible(), true);
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Close menu');
    await page.keyboard.press('Shift+Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), 'mailto:contact@benarfa.com');
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Close menu');
    await page.keyboard.press('Escape');
    assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), 'Open menu');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await dialog.getByRole('link', { name: 'Expertise', exact: true }).click();
    await page.waitForFunction(() => Math.abs(document.getElementById('services').getBoundingClientRect().top) < 120);
    assert.equal(await dialog.count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.style.overflow), '');

    console.log('Checking FAQ and linked pages…');
    const question = page.getByRole('button', { name: 'Can you handle frontend AND backend?', exact: false });
    await question.click();
    assert.equal(await question.getAttribute('aria-expanded'), 'true');
    const answer = page.locator(`#${await question.getAttribute('aria-controls')}`);
    assert.equal(await answer.getAttribute('aria-hidden'), 'false');
    assert.match(await answer.innerText(), /full stack/);
    await question.click();
    assert.equal(await answer.getAttribute('aria-hidden'), 'true');

    for (const path of ['/work', '/background', '/work/dtalk-ecosystem', '/work/beadcraft', '/work/autopart', '/work/menu-qr', '/benarfa-hamza-en.pdf']) {
      const result = await page.request.get(`${base}${path}`);
      assert.equal(result.status(), 200, `Route ${path}`);
    }
    assert.equal(await page.locator('.contact-mail').getAttribute('href'), 'mailto:contact@benarfa.com');

    console.log('Checking reduced motion and capturing screenshots…');
    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
    reduced.on('pageerror', (error) => errors.push(error.message));
    await reduced.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await reduced.locator('.intro-copy').evaluate(el => getComputedStyle(el).animationName), 'none');
    assert.equal(await reduced.evaluate(() => !!window.__lenis), false);
    // Scroll every image into range so the full-page artifact includes lazy-loaded images.
    for (const img of await reduced.locator('.project-tile img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    await reduced.evaluate(() => window.scrollTo(0, 0));
    await reduced.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
    await reduced.screenshot({ path: `${output}/desktop-hero.png` });
    await reduced.setViewportSize({ width: 390, height: 844 });
    await reduced.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
    await reduced.screenshot({ path: `${output}/mobile-hero.png` });
    await reduced.getByRole('button', { name: 'Open menu', exact: true }).click();
    await reduced.screenshot({ path: `${output}/mobile-menu.png` });
    assert.deepEqual(errors, [], 'Browser runtime errors');
    console.log('PASS: preview selection/keyboard/wraparound, 7 viewport widths, mobile focus trap/Escape/anchor navigation, FAQ toggle, 7 routes, contact, reduced motion, images, and browser runtime.');
    console.log(`Screenshots: ${output}`);
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
