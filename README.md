# Rookie Report

A static, dependency-free sports news site (HTML/CSS/JS) matching the Rookie Report brief. No build step required — open `index.html` directly or deploy the folder as-is.

## Structure
```
index.html            Homepage
article.html           Sample article page (Walker Kessler)
nba.html / wnba.html / soccer.html / opinions.html   Category listing pages
trade-tracker.html     Trade tracker table
free-agency.html       Free agency tracker table
rankings.html          Top 25 / Top 10 Rookies / Power Rankings (tabs)
about.html / contact.html
css/style.css           All styling, brand tokens, dark mode
js/main.js              Nav, dark mode, search, forms, tabs, filters
data/articles.json      All article content — edit this to publish
sitemap.xml / robots.txt
```

## Adding a new article
1. Duplicate `article.html`, update the headline, byline, body content, and `<title>`/meta tags at the top.
2. Add an entry to `data/articles.json` with a unique `slug`, `category`, `excerpt`, `author`, `date`, `image`, and `url` (path to your new HTML file). It will automatically appear in the homepage grids, category pages, related articles, and search — no other code changes needed.

## Notes
- Images use placeholder photo services (picsum.photos, pravatar.cc) — swap `src` attributes for real, licensed photography before launch.
- Dark mode preference is remembered via `localStorage`.
- Newsletter and contact forms are front-end only (no backend) — connect to an email service or form endpoint (e.g. Formspree, Mailchimp) when ready.
- Built mobile-first with a hamburger nav under 760px and responsive grid breakpoints at 1024px/760px.

## Deploying
This is a plain static site — drag the folder into **Cloudflare Pages**, **Vercel** (as a static project), or push to a repo and enable **GitHub Pages**. No build command needed; the site root is the publish directory.

## Editing the live site (only you can log in)
The site includes a private editor at `/admin` (built with Decap CMS) so you can add, edit, or remove articles from a browser — no code, no redeploy needed by hand. Login is handled by **DecapBridge** (free, works with any host — Cloudflare Pages, Netlify, Vercel, etc.), not the old Netlify Identity service, which Netlify has deprecated. See `SETUP-EDITING.md` for the one-time setup (about 15 minutes), after which only people you personally invite can edit.
