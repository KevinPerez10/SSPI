/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sspi-yellow': '#DF912E',
        'calendar-current-day': '#DF912E'
      }
    },
    fontFamily: {
      'gilmer': '"gilmer", Arial, sans-serif',
      'poppins': '"poppins", Arial, sans-serif',
    },
  },
  plugins: [],
}

