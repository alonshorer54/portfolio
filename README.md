# Portfolio

A portfolio site built with Next.js (App Router), TypeScript, Tailwind CSS and
shadcn/ui. Every page is statically generated — no database, no CMS, no API
routes.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, the featured project running live, a grid of the rest, contact |
| `/projects/[slug]` | One page per project: live demo, screenshots, how it works, stack |

Project pages are pre-rendered at build time from `generateStaticParams`, so all
of them ship as plain HTML.

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Opens on `http://localhost:3000`.

Other scripts: `npm run build` (production build), `npm run start` (serve the
build), `npm run lint`.

## Editing the content

Two files hold everything you would want to change:

| File | What it controls |
| --- | --- |
| `src/data/siteConfig.ts` | Name, role, intro paragraph, email, GitHub, LinkedIn, CV path |
| `src/data/projectsData.ts` | Every project — title, description, highlights, stack, links, media, embed |

Any link left as an empty string in `siteConfig` is hidden rather than rendered
dead, so the LinkedIn button only appears once you fill the URL in.

### Adding a project

Append an object to the `projects` array in `src/data/projectsData.ts`. The
`Project` type documents every field, and a page appears at
`/projects/<slug>` automatically. Exactly one project should carry
`isFeatured: true` — that one gets the large layout under the hero.

### Showing that a project works

In order of how convincing they are:

**1. A live embed.** Set `embed` and the running app appears in a device frame,
on both the home page and the project page:

```ts
embed: {
  url: "https://your-app.example",
  title: "Your app running live",
  frame: "phone", // or "browser"
}
```

Only do this for a site you control **and have checked**. A host that sends
`X-Frame-Options` or a `frame-ancestors` CSP renders a blank box instead, and
the browser gives the page no way to detect that. Check with:

```bash
curl -sI https://your-app.example | grep -i -E "x-frame-options|content-security-policy"
```

Empty output means it will embed.

**2. A video.** Put an MP4 or WebM in `public/media/<slug>/` and add it to
`media` with `kind: "video"`. It plays muted, looping and inline.

**3. Screenshots and charts.** Same folder, `kind: "screenshot"` or `"chart"`.

**4. Nothing.** The card falls back to the app icon (`kind: "icon"`) or the
project's initials, styled as a tile rather than left blank.

Give every media entry an accurate `alt`, `width` and `height`.

### Adding your CV

Drop the PDF at `public/cv/alon-shorer-cv.pdf` — the filename has to match
`cvPath` in `siteConfig.ts`. To remove the button instead, set `cvPath` to `""`.

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and import
   the repository.
3. Leave every build setting at its default — Vercel detects Next.js on its own.
4. Click **Deploy**.

Every push to `main` redeploys automatically, and every pull request gets its own
preview URL. A custom domain is added under Project → Settings → Domains.
