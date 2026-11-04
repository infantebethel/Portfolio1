# Running the portfolio

The Home lanyard and Personal profile card use React modules, so open the site through Vite rather than opening an HTML file directly or using a static-only preview server.

On Windows, double-click `start-portfolio.cmd`. It installs dependencies if needed, starts Vite, and opens the Home page.

Alternatively:

1. Open a terminal in this `P2` folder.
2. Run `npm install` once.
3. Run `npm start`.
4. Vite opens the Home page at `http://127.0.0.1:5173/`.

Use the navigation links to open Home, Personal Information, Achievements, and Family & Friends. The Home page contains the interactive lanyard; Personal Information contains the interactive profile card.

In VS Code, choose **Terminal → Run Task → Run P2 portfolio** to start it from the correct folder. Do not use **Live Server** or open the HTML files directly: those do not compile the React JSX modules, so the lanyard and profile card will be blank.

The interactive lanyard and profile card need JavaScript and WebGL, so they do not appear inside search-result previews. Search engines may take time to index the site; submit `https://www.magpaliwintonia.devs.surf/sitemap.xml` in Google Search Console or the equivalent search-engine webmaster tools to request crawling. A search result links visitors to the live interactive pages.

To create a static production site, run `npm run build` and publish the contents of `dist`.

## Publishing with GitHub Pages

The repository includes a GitHub Actions workflow that builds `P2` and deploys it to GitHub Pages whenever changes are pushed to `master`. The site URL is `https://nazarocode.github.io/Magpali-s-Portfolio/`.

To enable it, open the repository's **Settings → Pages** and set the build and deployment source to **GitHub Actions**. The first deployment can also be started from the repository's **Actions** tab by running **Deploy P2 to GitHub Pages**. The repository must be public to use GitHub Pages on GitHub Free.

The Vite build uses relative asset paths, so the portfolio works from the repository's `/Magpali-s-Portfolio/` path. GitHub Pages hosting provides the free `github.io` address; a custom subdomain still needs a working DNS CNAME record.

## Publishing with Cloudflare Pages

Cloudflare Pages can build and deploy this Vite site directly from the GitHub repository:

1. Sign in to Cloudflare and open **Workers & Pages → Create application → Pages → Connect to Git**. Authorize GitHub and select `nazarocode/Magpali-s-Portfolio`.
2. Set the production branch to `main` or `master`, the root directory to `P2`, the build command to `npm run build`, and the build output directory to `dist`. No environment variables are required.
3. Save and deploy. Cloudflare will provide a `*.pages.dev` address and automatically redeploy on pushes to the production branch.
4. To use a custom subdomain such as `www.magpaliwintonia.devs.surf`, first create a CNAME record with your DNS provider, then add the full hostname in the Pages project's **Custom domains** settings and follow Cloudflare's verification steps.
5. Wait for Cloudflare to verify DNS and provision HTTPS. DNS changes may take time to propagate.

The Cloudflare account owner must authorize the GitHub connection and configure the domain. Do not share Cloudflare API tokens or account passwords in chat.
