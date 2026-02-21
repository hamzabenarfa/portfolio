const { chromium, devices } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  
  const capturePage = async (route, name, fullPage, isMobile = false) => {
    let contextOptions = { viewport: { width: 1440, height: 900 } };
    if (isMobile) {
      contextOptions = { ...devices['iPhone 13 Pro'] };
    }
    const page = await browser.newPage(contextOptions);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    console.log(`Navigating to ${route}...`);
    await page.goto(`https://d-talk-ecosytem-front-three.vercel.app${route}`, { waitUntil: 'load', timeout: 60000 });
    
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          transition-duration: 0s !important;
          animation-duration: 0s !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `
    });
    
    await page.waitForTimeout(5000); // initial load
    
    // Quick scroll to bottom
    await page.evaluate(async () => {
      return new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 800;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    await page.waitForTimeout(2000);
    
    // Scroll back up
    await page.evaluate(async () => {
      return new Promise((resolve) => {
        let currentHeight = document.documentElement.scrollTop;
        const distance = -800;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          currentHeight += distance;
          if (currentHeight <= 0) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
    
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(3000);
    
    console.log(`Capturing ${name}...`);
    await page.screenshot({ path: `public/${name}`, fullPage: fullPage, animations: 'disabled' });
    await page.close();
  };

  await capturePage('/en', 'dtalk-landing-full.png', true);
  await capturePage('/en/about-us', 'dtalk-about-us.png', false);
  await capturePage('/en/service', 'dtalk-service.png', false);
  await capturePage('/en/learn-more/ai', 'dtalk-ai.png', false);
  await capturePage('/en/auth', 'dtalk-auth.png', false);
  
  // Mobile Capture
  console.log('Capturing mobile view...');
  const iPhone = devices['iPhone 13 Pro'];
  const mobilePage = await browser.newPage({ 
    ...iPhone,
    viewport: { width: iPhone.viewport.width, height: 3000 } // Limit height to avoid WebP size bounds
  });
  await mobilePage.emulateMedia({ reducedMotion: 'reduce' });
  await mobilePage.goto(`https://d-talk-ecosytem-front-three.vercel.app/en`, { waitUntil: 'load', timeout: 60000 });
  await mobilePage.addStyleTag({
    content: `
      *, *::before, *::after {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
      }
    `
  });
  await mobilePage.waitForTimeout(5000);
  await mobilePage.screenshot({ path: `public/dtalk-mobile-full.png`, animations: 'disabled' });
  await mobilePage.close();

  await browser.close();
  console.log('Done.');
})();
