/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#f5f6f7',
          100: '#ebedef',
          200: '#d1d6db',
          300: '#b7bec7',
          400: '#838d9e',
          500: '#4f5d75',
          600: '#475469',
          700: '#3b4658',
          800: '#2f3846',
          900: '#262e3a',
        },
      },
    },
  },
  plugins: [],
}