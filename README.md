# WhatsApp Redirect

A minimal web app that helps you open a WhatsApp chat with any phone number without adding it to your contacts. Built with [Astro](https://astro.build/), React and Tailwind CSS.

## Purpose

Many times you need to send a quick message to a number that is not in your contacts. WhatsApp Redirect lets you select a country prefix, type the phone number and immediately open `https://wa.me/` with that number. The generated link can also be shared so other users open the same chat.

## Running locally

```bash
pnpm install   # or npm install
pnpm run dev   # start development server at http://localhost:4321
```

Other useful scripts:

- `pnpm run build` – build the site to `dist/`.
- `pnpm run preview` – serve the production build locally.
- `pnpm run format` – format all files with Prettier.

## How it works

The home page renders a small React form. After choosing a country and entering the number, submitting the form redirects your browser to WhatsApp using `https://wa.me/{prefix}{number}`. If you append a `?phone=<number>` query parameter to the page URL, the site automatically redirects to WhatsApp on load. A Share button can generate and share this link using the Web Share API or copy it to the clipboard.
