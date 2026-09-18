import { test, expect } from '@playwright/test';

/**
 * Every real app route from src/router/index.js (HTML5 history mode).
 * Catch-all NotFound is omitted — a nonsense path still mounts #app, but
 * the goal is to smoke the declared pages, not 404 UX.
 *
 * /lounge (router meta.requiresAuth) and /dashboard (in-view token check)
 * redirect to /login when unauthenticated; that is expected and OK.
 */
const ROUTES = [
  '/',
  '/about',
  '/events',
  '/study',
  '/exam-cities',
  '/teams',
  '/contact',
  '/login',
  '/lounge',
  '/dashboard',
  '/community',
  '/community/technical',
  '/community/cultural',
  '/community/esports',
  '/meetups',
  '/meetups/delhi-ncr',
  '/meetups/mumbai',
  '/meetups/bangalore',
  '/meetups/kolkata',
  '/meetups/hyderabad',
  '/meetups/patna',
  '/meetups/chandigarh',
  '/meetups/chennai',
  '/meetups/lucknow',
  '/verify-certificate',
];

// HTML5 history: the route is the path itself.
function routeUrl(path) {
  return path;
}

/** Path portion of a URL (no query, no hash). e.g. "/about?x=1#a" → "/about" */
function pathFromUrl(url) {
  const pathname = new URL(url).pathname || '/';
  return pathname;
}

// Auth-gated paths may end at /login when no sundarbans_auth_token is set.
const AUTH_REDIRECT_ROUTES = new Set(['/lounge', '/dashboard']);

// CDN/hotlink resource failures (fonts, GSI, Unsplash, LinkedIn) are noise for smoke.
function isCdnResourceFailure(text) {
  return /Failed to load resource/i.test(text);
}

test.describe('route smoke', () => {
  for (const path of ROUTES) {
    test(`renders ${path} without console errors`, async ({ page }) => {
      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (msg) => {
        if (msg.type() !== 'error') return;
        const text = msg.text();
        if (isCdnResourceFailure(text)) return;
        consoleErrors.push(text);
      });
      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      // Prefer 'load' over 'networkidle' — app always pulls fonts/GSI; many pages Unsplash.
      await page.goto(routeUrl(path), { waitUntil: 'load' });

      const app = page.locator('#app');
      await expect(app).toBeVisible();

      // Path must match the declared route (or login redirect for auth-gated paths).
      const finalUrl = page.url();
      const actual = pathFromUrl(finalUrl);
      if (AUTH_REDIRECT_ROUTES.has(path)) {
        expect(
          actual === path || actual === '/login',
          `${path} should stay put or redirect to /login; got ${finalUrl}`
        ).toBe(true);
      } else {
        expect(actual, `expected path ${path} for ${finalUrl}`).toBe(path);
      }

      // Declared routes must not render NotFoundView (distinctive badge + 404 heading).
      await expect(page.getByText('Page Not Found', { exact: true })).toHaveCount(0);
      await expect(page.locator('h1.notfound-code')).toHaveCount(0);

      expect(pageErrors, `pageerror on ${path}: ${pageErrors.join(' | ')}`).toEqual([]);
      expect(consoleErrors, `console error on ${path}: ${consoleErrors.join(' | ')}`).toEqual([]);
    });
  }
});
