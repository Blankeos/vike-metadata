# vike-metadata

<div align="center">
  <img src="_docs/image.png" alt="vike-metadata-banner" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/maintained%20with-bun-cc00ff.svg?style=for-the-badge&logo=bun)](https://bun.sh/" alt="Bun"></img>
  <a href="https://www.npmjs.com/package/vike-metadata-react" target="_blank">
  <img src="https://img.shields.io/npm/dw/vike-metadata-react?style=for-the-badge" alt="NPM Downloads"></img></a>
  <!-- <img src="https://img.shields.io/npm/l/vike-metadata-react?style=for-the-badge" alt="NPM License"></img> -->
  <img src="https://img.shields.io/bundlephobia/minzip/vike-metadata-react?style=for-the-badge" alt="NPM Bundle Size" ></img>
</div>

A hook I made to manage metadata for your Vike + React/Solid/Vue app. Kinda like Next-SEO or React Helmet but for Vike and in a simple hook.

## Features

- [x] ☁️ Lightweight and simple.
- [x] 😻 Typesafe, repeatable, and pleasant DX for managing meta tags.
- [x] ❇️ Similar API to Next.js's [Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object).
- [x] ⚒️ Made for Vike + React/Solid/Vue.
- [x] 🚀 Built on top of `useConfig` (a universal hook in Vike).

## Quick start

Install it:

```bash
npm i vike-metadata-react # react
npm i vike-metadata-solid # solid
npm i vike-metadata-vue # vue
```

### Get Started

1. Configure defaults

```tsx
// In your app's entry point, usually layout.
import { useMetadata } from 'vike-metadata-solid';

useMetadata.setGlobalDefaults({
  title: 'Vike + Solid',
  description: 'Demo showcasing Vike + Solid',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
});

export function RootLayout(props) {
  // ...
}
```

2. Use in your pages

Adding defaults does not add the metadata to the page. This does. So if you don't use `useMetadata` on a page the tags will not be rendered at all. We don't use the cumulative approach like Next.js does.

```tsx
export function Page() {
  useMetadata({
    title: getTitle('About'),
    description: 'Learn about why this template is cool.',
  });

  // ...
}
```

### FAQs

- **Is this a zero-cost abstraction?** Most abstractions aren't. This technically does parses the typescript data shape into actual metatags and a lot of IF statements to render them or not, so that might be the "very, very" small cost here? Obviously laying out your metatags by yourself would be computationally cheaper, but I haven't really tested the overhead. Although, I'd choose still this over laying it out myself just for the DX. In most cases, this is what Next.js's Metadata API does too.
- **How to do Template Strings?** If you're looking for something like `%s | My Site`, just make a utility function like:

  ```ts
  const TITLE_TEMPLATE = '%s | My Site';
  export function getTitle(title: string) {
    return TITLE_TEMPLATE.replace('%s', title);
  }
  ```
