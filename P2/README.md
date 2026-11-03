# Running the portfolio

The Home lanyard and Personal profile card use React modules, so open the site through Vite rather than opening an HTML file directly or using a static-only preview server.

On Windows, double-click `start-portfolio.cmd`. It installs dependencies if needed, starts Vite, and opens the Home page.

Alternatively:

1. Open a terminal in this `P2` folder.
2. Run `npm install` once.
3. Run `npm start`.
4. Vite opens the Home page at `http://127.0.0.1:5173/`.

Use the navigation links to open Home, Personal, Achievements, and Parents. The Home page contains the interactive lanyard; Personal contains the interactive profile card.

In VS Code, choose **Terminal → Run Task → Run P2 portfolio** to start it from the correct folder. Do not use **Live Server** or open the HTML files directly: those do not compile the React JSX modules, so the lanyard and profile card will be blank.

To create a static production site, run `npm run build` and publish the contents of `dist`.

## Publishing with Cloudflare Pages

Cloudflare Pages can build and deploy this Vite site directly from the GitHub repository:

1. Sign in to Cloudflare and open **Workers & Pages → Create application → Pages → Connect to Git**. Authorize GitHub and select `nazarocode/Magpali-s-Portfolio`.
2. Set the production branch to `main` or `master`, the root directory to `P2`, the build command to `npm run build`, and the build output directory to `dist`. No environment variables are required.
3. Save and deploy. Cloudflare will provide a `*.pages.dev` address and automatically redeploy on pushes to the production branch.
4. To use `www.wintoniamagpali.com`, add the domain to your Cloudflare account and open the Pages project's **Custom domains** settings. Add `www.wintoniamagpali.com` there and follow Cloudflare's DNS instructions. The domain must be active in Cloudflare; if it is registered elsewhere, Cloudflare will guide you through changing its nameservers.
5. Wait for Cloudflare to verify DNS and provision HTTPS. If you also want the bare domain `wintoniamagpali.com`, add it as a separate custom domain and configure its redirect to `www` in Cloudflare.

The Cloudflare account owner must authorize the GitHub connection and configure the domain. Do not share Cloudflare API tokens or account passwords in chat.
