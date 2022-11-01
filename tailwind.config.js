/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'ui-sans-serif'],
    },
    container: {
      center: true,
      padding: '16px',
    },
    extend: {
      colors: {
        primary: '#297aa0',
        dark: '#242424',
        dark2: '#1b1b1b',
        textDark: '#D9D9D9',
      },
    },
    screen: {
      '2xl': '1320px',
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp'), require('daisyui')],
};
