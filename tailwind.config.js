/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a9ba',
          400: '#ec7694',
          500: '#e14a75',
          600: '#c42d5e',
          700: '#a4214d',
          800: '#891e44',
          900: '#751c3e',
          950: '#420b1f',
        },
      },
      backgroundImage: {
        'wine-pattern': "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80')",
      },
    },
  },
  plugins: [],
};