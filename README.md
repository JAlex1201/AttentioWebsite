# Attentio Website

Landing page for Attentio. Your organization's rules, principles, and behaviors reliably embedded into AI you own and deploy.

## Files

- `index.html` — the landing page (all markup, styles, and logic)
- `support.js` — runtime that renders the page (required, same directory)
- `assets/` — model and cloud provider logos

## Run locally

Serve the folder with any static server (opening `index.html` directly via `file://` also works in most browsers):

```bash
npx serve .
# or
python3 -m http.server
```

## Deploy

Any static host works: GitHub Pages, Netlify, Vercel, S3, nginx. For GitHub Pages: Settings → Pages → deploy from the `main` branch root.
