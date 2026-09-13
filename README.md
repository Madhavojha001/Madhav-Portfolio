# Madhav Ojha — Premium Portfolio

A lightweight, responsive founder portfolio built with semantic HTML, modern CSS and dependency-free JavaScript.

## What is included

- Premium responsive design for mobile, tablet and desktop
- Selected projects with honest stage labels and a working FindVault link
- 34 carefully cropped certificate and award visuals
- Filterable achievement gallery with keyboard-friendly lightbox
- Contact form that opens a pre-filled WhatsApp conversation (no backend required)
- SEO, social sharing metadata, structured person data and web manifest
- Accessibility support, reduced-motion handling and graceful no-JavaScript fallback
- Security and caching headers for Firebase Hosting, Netlify and Vercel

## Preview locally

Run the included verification first:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\VERIFY_PORTFOLIO.ps1
```

From this folder, run one of these commands:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

Opening `index.html` directly also works, but a local server gives a more accurate deployment preview.

## Deploy

### Firebase Hosting

```powershell
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only hosting
```

The included `firebase.json` deploys this folder and applies long-lived asset caching plus security headers.

### Netlify

Drag this folder into Netlify Drop, or connect it to a repository. The included `netlify.toml` sets the publish directory and headers.

### Vercel

Import the folder/repository as a project and deploy without a build command. The included `vercel.json` applies clean URLs, caching and security headers.

### GitHub Pages

Push the folder contents to a repository and enable Pages from the repository root. `.nojekyll` is already included.

For the exact first-publish and republish commands, including cleanup of old duplicate folders, see [`GITHUB_REPUBLISH_GUIDE.md`](GITHUB_REPUBLISH_GUIDE.md).

## Before using a custom domain

Add the final public URL as a canonical URL in `index.html`. If desired, also generate a `sitemap.xml` using that domain. These values are intentionally not guessed in this package.

## Content updates

- Profile image: `assets/images/madhav-ojha.jpg`
- Achievement images: `assets/images/achievements/`
- Site copy and project cards: `index.html`
- Visual design: `assets/css/styles.css`
- Interactions: `assets/js/app.js`

After every edit, save the files, run `VERIFY_PORTFOLIO.ps1`, then commit and push the changes. GitHub Pages, Netlify and Vercel will republish automatically when they are connected to the repository.
