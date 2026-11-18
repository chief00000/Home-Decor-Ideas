# Adsterra integration — intentionally not activated

The current release contains reserved, hidden ad containers only. No Adsterra publisher ID, zone ID, or advertising script has been invented or installed. The former unverified `bauval.org` references have been removed.

## Reserved placements

The containers are in `index.html` and carry these `data-ad-slot` identifiers:

- `after-intro` — after the homepage introduction
- `inspiration-end` — after the design library
- `after-tools` — after the free tools section
- `before-footer` — before site information/footer

They remain `hidden` until a verified, approved provider integration is configured. Do not remove `hidden` to create a fake ad.

## When Adsterra supplies your official code

1. Sign in to your Adsterra publisher account and copy the current code for the specific approved ad unit. Keep the publisher and zone identifiers private until you are ready to publish; do not substitute sample IDs.
2. Verify the script URL, redirect/frame destinations, connection endpoints, and any inline bootstrap code from the official code you received. Do not use code copied from an unknown tutorial or third party.
3. Add the provider snippet only to the relevant container in `index.html`, or preferably put external loader code in a dedicated `ads/adsterra.js` file and load it with a normal same-origin script tag. Keep ads separate from `script.js` and `engagement.js`.
4. Review `_headers` before deployment. The current policy allows scripts only from `'self'`, frames are denied, and `connect-src` is same-origin. The actual official integration may need narrowly scoped `script-src`, `frame-src`, `img-src`, or `connect-src` origins. Add only exact origins observed in the official code and confirmed provider documentation. Do not add `*`, `https:`, `unsafe-eval`, or broad wildcards. If inline bootstrap is unavoidable, prefer a CSP hash or nonce strategy supported by your host; do not broadly enable `'unsafe-inline'` for scripts.
5. If the ad provider uses cookies, identifiers, profiling, or other storage, implement the legally appropriate consent flow and update the Privacy Policy before loading the ad code. Consent requirements depend on visitor location and the provider's actual behavior.
6. After verification, remove `hidden` only from the placement(s) you are activating and provide a reserved minimum height matching the real ad format to avoid layout shifts.

## How to verify

- Deploy to HTTPS and inspect the browser Network panel: confirm the expected official script loads successfully and only expected provider domains are contacted.
- Inspect Console for CSP violations; resolve them with narrow source additions, not by weakening the whole policy.
- Check the provider dashboard for zone status/impressions; a visible iframe alone does not prove monetization is approved or earning.
- Test mobile and desktop layout, ad-blocker/network failure, keyboard navigation, and the consent choice. The site must remain usable if ads fail.
- Re-test privacy disclosures, security headers, PWA install/offline behavior, and performance after enabling ads.

Ad approval, fill rates, earnings, and legal compliance are not guaranteed.
