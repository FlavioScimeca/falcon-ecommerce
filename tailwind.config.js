/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(180.96deg, #C3ACD0, #5D3891)',
      },
      colors: {
        primary: {
          light: '#b298dc',
          DEFAULT: '#8758c4',
          dark: '#6028a8',
        },
      },
    },
  },
  plugins: [],
};
