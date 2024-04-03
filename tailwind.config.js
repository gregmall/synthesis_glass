/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{

      },
      backgroundImage:{
        'header':"url('/public/assets/header.jpg')"
      }
    },
  },
  plugins: [],
}

