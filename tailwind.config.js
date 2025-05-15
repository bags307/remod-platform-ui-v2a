/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'expand-down': 'expand-down 0.2s ease-in-out forwards'
      }
    },
  },
  plugins: [],
};
