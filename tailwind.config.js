/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F3EDE2',
          300: '#E8DCC8',
          400: '#D4C3A9',
          500: '#C1A98B',
          600: '#A68B6C',
        },
      },
    },
  },
  plugins: [],
};