/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionTimingFunction: {
        'ease-spring': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        'expand-down': 'expand-down 0.5s ease-spring forwards',
        'fade-in': 'fade-in 0.2s ease-spring forwards'
      }
    },
  },
  plugins: [],
};
