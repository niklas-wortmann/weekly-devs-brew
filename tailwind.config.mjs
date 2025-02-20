/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#09302B',
          accent: '#D69C42',
          light: '#F6E8E5',
        },
        secondary: {
          DEFAULT: '#B6C1C0',
          dark: '#9F4900',
          neutral: '#AA8E7B',
        },
      },
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'amalfi': ['Amalfi Coast', 'cursive'],
      },
    },
  },
  plugins: [],
}