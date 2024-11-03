/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
      fontFamily: {
        'halloween': ['halloween', 'sans-serif'],
      }
    }
  },
  plugins: []
};