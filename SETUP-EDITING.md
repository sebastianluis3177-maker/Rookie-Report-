# Setup: Put the site online, and make it editable only for you

Three free accounts, in this order:
1. **GitHub** — stores your website's files
2. **Cloudflare Pages** (or Netlify/Vercel — any works now) — hosts your live website
3. **DecapBridge** — the lock that lets only you log into the editing page

Total time: about 15 minutes.

## 1. Put the code on GitHub
1. Go to **github.com**, make a free account if you don't have one.
2. Click the **+** in the top right → **New repository**. Name it `rookie-report`. Keep it Public. Click **Create repository**.
3. On your computer, inside the `rookie-report` folder, run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/rookie-report.git
   git push -u origin main
   ```
   (Swap `YOUR-USERNAME` for your actual GitHub username.)

## 2. Host the site for free
1. Go to **pages.cloudflare.com** and sign up free.
2. Click **Create a project → Connect to Git**, choose GitHub, and pick your `rookie-report` repo.
3. Leave the build settings blank/default (this site needs no build step) and click **Save and Deploy**.
4. In a minute you'll get a free address like `rookie-report.pages.dev` — that's your live site.

*(Netlify or Vercel work exactly the same way if you'd rather use those instead.)*

## 3. Set up DecapBridge (this is the "only me" part)
1. Go to **decapbridge.com** → **Sign up** (free — 3 sites, 10 collaborators included).
2. Click **Add a site** and fill in:
   - **Git provider:** GitHub
   - **Git repository:** `YOUR-USERNAME/rookie-report`
   - **Git access token:** click the link it gives you to github.com/settings/tokens, create a token with read/write access to your repo's contents, and paste it in.
   - **Decap CMS login URL:** `https://rookie-report.pages.dev/admin/index.html` (use your real site address)
   - **Auth type:** Classic (simplest — plain email + password login)
3. Click **Create site**. DecapBridge will show you a ready-made `config.yml`.
4. Copy that code and paste it into `admin/config.yml` in your project (replacing what's there), then push it to GitHub:
   ```
   git add admin/config.yml
   git commit -m "Connect DecapBridge"
   git push
   ```
5. Wait a minute for your host to redeploy, then visit `https://your-site-address/admin/` — you should see a login screen.

## 4. Invite yourself (and only yourself)
1. Back in the DecapBridge dashboard, open your site → **Manage collaborators**.
2. Type in your own email → **Send invite**.
3. Check your email, click the link, set a password.
4. From now on, only email addresses you personally invite here can log into `/admin`. Nobody else can get in, no matter how many people visit your public site.

## 5. Start editing
1. Go to `your-site-address/admin/` (or click the quiet "Editor Login" link in the site's footer).
2. Log in with the email/password from step 4.
3. Click **Articles**. Add, edit, or delete any entry.
4. Hit **Save** — it commits straight to GitHub, and your host redeploys automatically within a minute or two.

## Buying and connecting your domain (the only paid part)
1. Buy a domain from **Namecheap**, **Cloudflare Registrar** (cheapest, no markup), or similar — around $10–15/year.
2. In your Cloudflare Pages (or Netlify/Vercel) dashboard, go to **Custom domains → Add a domain**, type it in, and follow the on-screen steps (usually just adding one or two DNS records — Cloudflare Registrar does this automatically if you bought the domain there).
3. Update your DecapBridge site's **Decap CMS login URL** to use your new domain instead of the `.pages.dev` one.

## What "only for me" actually means here
- Anyone can visit and read the public site — that never changes.
- Only emails *you* invite in DecapBridge can log into `/admin` at all — there's no self-signup.
- Even if someone finds the `/admin` URL, DecapBridge blocks them at login.
- Want to remove someone's access later, or add a co-editor? Do it from the **Manage collaborators** tab any time.

## Extending what's editable
Right now `/admin` edits `data/articles.json` (every homepage card, category page, and search result pulls from this file). If you later want to edit the About page text or hero settings the same way, that's just another entry in `admin/config.yml` — happy to help wire that up when you're ready.
