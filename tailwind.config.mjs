/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#09302B',
            a: {
              color: '#D69C42',
              '&:hover': {
                color: '#9F4900',
              },
            },
            h1: {
              color: '#D69C42',
              fontFamily: '"Bebas Neue", sans-serif',
            },
            h2: {
              color: '#D69C42',
              fontFamily: '"Bebas Neue", sans-serif',
            },
            h3: {
              color: '#D69C42',
              fontFamily: '"Bebas Neue", sans-serif',
            },
          },
        },
        invert: {
          css: {
            color: '#F6E8E5',
            a: {
              color: '#D69C42',
              '&:hover': {
                color: '#B6C1C0',
              },
            },
            h1: {
              color: '#D69C42',
            },
            h2: {
              color: '#D69C42',
            },
            h3: {
              color: '#D69C42',
            },
          },
        },
      },
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
  plugins: [
    require('@tailwindcss/typography')({
      className: 'prose',
    }),
  ],
}
