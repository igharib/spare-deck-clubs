import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = path.resolve(import.meta.dirname, '..');
const html = fs.readFileSync(path.join(repoRoot, 'index.html'), 'utf8');

test('index includes the GTM container in head and noscript fallback in body', () => {
  assert.match(html, /<!-- Google Tag Manager -->/);
  assert.match(html, /googletagmanager\.com\/gtm\.js\?id='\+i\+dl/);
  assert.match(html, /GTM-WC8BVPNT/);
  assert.match(html, /<body>\s*<!-- Google Tag Manager \(noscript\) -->/);
  assert.match(html, /<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html\?id=GTM-WC8BVPNT"/);
});

test('index includes the Zoho SalesIQ widget before closing body', () => {
  assert.match(html, /<script type = "text\/javascript" id = "zsiqchat">/);
  assert.match(html, /widgetcode: "siq93f5982906e13c86fd752d6d37194d3f4938738ad178cbd91f75048dd0fc02f6"/);
  assert.match(html, /s\.src = "https:\/\/salesiq\.zoho\.com\/widget";/);
  assert.match(html, /<script type = "text\/javascript" id = "zsiqchat">[\s\S]*<\/script>[\s\S]*<\/body>/);
});

test('all html pages include the Tawk.to embed before closing body', () => {
  const htmlPages = [
    'index.html',
    'mockup-visuals.html',
    'mockup-catering-overview.html',
  ];

  for (const page of htmlPages) {
    const pageHtml = fs.readFileSync(path.join(repoRoot, page), 'utf8');
    assert.match(pageHtml, /s1\.src='https:\/\/embed\.tawk\.to\/6a03c3a3f9cfec1c3250ec1c\/1jofb8e10';/);
    assert.match(pageHtml, /s1\.setAttribute\('crossorigin','\*'\);/);
    assert.match(pageHtml, /s1\.src='https:\/\/embed\.tawk\.to\/6a03c3a3f9cfec1c3250ec1c\/1jofb8e10';[\s\S]*<\/body>/);
  }
});

test('index includes the standard GA4 tag snippet in head', () => {
  assert.match(html, /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-PF82P3VX1M"><\/script>/);
  assert.match(html, /function gtag\(\)\{dataLayer\.push\(arguments\);\}/);
  assert.match(html, /gtag\('config', 'G-PF82P3VX1M', \{\s*send_page_view: false\s*\}\);/);
});

test('index tracks virtual pageviews for slide deck navigation in GA4 and HubSpot', () => {
  assert.match(html, /const GA_SLUGS = \[/);
  assert.match(html, /function trackVirtualPageView\(/);
  assert.match(html, /window\._hsq = window\._hsq \|\| \[\];/);
  assert.match(html, /window\._hsq\.push\(\['setPath', meta\.path\]\);/);
  assert.match(html, /window\._hsq\.push\(\['trackPageView'\]\);/);
  assert.match(html, /function switchPersona\(p\)[\s\S]*trackVirtualPageView\(\);/);
  assert.match(html, /function goTo\(idx, dir\)[\s\S]*trackVirtualPageView\(\);/);
  assert.match(html, /analyticsVirtualTrackingReady = true;[\s\S]*trackVirtualPageView\(\);/);
});

test('index tracks CTA and persona interaction events in GA4 and HubSpot', () => {
  assert.match(html, /function trackInteraction\(eventName, params = \{\}\)/);
  assert.match(html, /function trackHubSpotEvent\(eventName, params = \{\}\)/);
  assert.match(html, /function trackBookDemoClick\(location\)/);
  assert.match(html, /trackInteraction\('book_demo_click', \{ cta_location: location \}\);/);
  assert.match(html, /function switchPersona\(p\)[\s\S]*trackInteraction\('persona_switch', \{ target_persona: p \}\);/);
  assert.match(html, /function openDownload\(\)[\s\S]*trackInteraction\('download_pdf_open', \{ modal_name: 'deck_download' \}\);/);
  assert.match(html, /function openCalculator\(\)[\s\S]*trackInteraction\('calculator_open', \{ modal_name: 'marketplace_calculator' \}\);/);
  assert.match(html, /function submitDownload\(e\)[\s\S]*trackInteraction\('get_deck_submit_success', \{ form_name: 'deck_download' \}\);/);
  assert.match(html, /function submitCalculator\(e\)[\s\S]*trackInteraction\('calculator_launch', \{ destination: 'marketplace_calculator' \}\);/);
  assert.match(html, /onclick="trackBookDemoClick\('nav_sidebar'\)"/);
});
