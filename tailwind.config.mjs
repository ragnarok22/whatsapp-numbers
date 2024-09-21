/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#25D366',
        secondary: '#FCF5EB',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
