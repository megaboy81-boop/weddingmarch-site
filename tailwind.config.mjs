/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'rose-gold': '#B76E79',
        'rose-gold-light': '#D4A0A7',
        'champagne': '#F7E7CE',
        'ivory': '#FFFFF0',
        'deep-rose': '#8B3A47',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
