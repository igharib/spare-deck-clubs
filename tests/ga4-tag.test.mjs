import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');

test('index includes the standard GA4 tag snippet in head', () => {
  assert.match(html, /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-PF82P3VX1M"><\/script>/);
  assert.match(html, /function gtag\(\)\{dataLayer\.push\(arguments\);\}/);
  assert.match(html, /gtag\('config', 'G-PF82P3VX1M'\);/);
});

test('index tracks virtual pageviews for slide deck navigation', () => {
  assert.match(html, /const GA_SLUGS = \[/);
  assert.match(html, /function trackVirtualPageView\(/);
  assert.match(html, /function switchPersona\(p\)[\s\S]*trackVirtualPageView\(\);/);
  assert.match(html, /function goTo\(idx, dir\)[\s\S]*trackVirtualPageView\(\);/);
});
