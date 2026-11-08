# Infante, Bethel Joy M.'s portfolio

## Run locally

```sh
npm install
npm run dev
```

## Build for production

```sh
npm run build
npm run preview
```

Before publishing, replace the sample email address in `src/App.tsx` with
the address where you want to receive messages.

The portfolio is designed to fit one screen without page scrolling. Use the
navigation to switch between the home, about, learning, and contact panels.

## Publish with GitHub Pages

The repository's default branch is deployed automatically by the GitHub
Actions workflow. In the repository settings, enable **Pages** with **GitHub
Actions** as the deployment source.

The GitHub Pages address is `https://infantebethel.github.io/Portfolio1/`.

The custom domain is `infantebethel.devs.surf`, managed through Devs.Surf.
The domain's CNAME record points to `infantebethel.github.io`. GitHub Pages
has the domain configured, DNS verified, and HTTPS enforced in the repository's
**Settings → Pages**.

## Search engine indexing

The site includes a canonical URL, descriptive metadata, Person structured
data, `robots.txt`, and an XML sitemap. These help search engines discover
and understand the site but do not guarantee when or whether it appears in
search results.

To request indexing, add `https://infantebethel.devs.surf/` as a URL-prefix
property in [Google Search Console](https://search.google.com/search-console),
complete Google's ownership verification, submit
`https://infantebethel.devs.surf/sitemap.xml`, and use **URL inspection →
Request indexing** for the homepage.
