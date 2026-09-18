# Starlive Engineering — Website

Single-page marketing site for STARLIVE ENGINEERING PTE LTD (underground utility
detection, cable tracing, land surveying, and water leak detection in Singapore).

## Structure

```
starlive-engineering/
├── index.html       # Page shell: meta tags, CDN <script> links, Tailwind config
├── css/
│   └── styles.css   # All custom CSS (animations, hover states, floating button, etc.)
└── js/
    └── app.jsx       # All React components (Navbar, Hero, Services, Contact, Footer, …)
```

## How it works

This project has **no build step**. It loads React, ReactDOM, and Babel Standalone
from CDN links in `index.html`, and `app.jsx` is loaded as
`<script type="text/babel" src="js/app.jsx">` — the browser transpiles the JSX
on the fly. Styling is Tailwind's CDN build (configured inline in `index.html`)
plus the custom rules in `css/styles.css`.

This mirrors the original single-file version exactly, just split into
conventional `html` / `css` / `js` (React/JSX) files for a cleaner GitHub repo.

## Running locally

Because the browser fetches `css/styles.css` and `js/app.jsx` as separate files,
opening `index.html` directly with `file://` may be blocked by CORS in some
browsers. Serve it instead:

```bash
# from the project folder
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying (e.g. GitHub Pages)

1. Push this folder to a GitHub repo.
2. In the repo settings, enable **GitHub Pages** → deploy from the `main`
   branch, root folder.
3. The site will be live at `https://<username>.github.io/<repo-name>/`.

## Editing site content

Company name, phone, email, and address are defined near the top of
`js/app.jsx` (`COMPANY`, `PHONE_DISPLAY`, `EMAIL`, `ADDRESS_LINES`, etc.) —
update those constants rather than hunting through the JSX.

> Note carried over from the original file: confirm the WhatsApp number and
> the exact unit/postal code in `ADDRESS_LINES` with the client before launch.
