/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
            "./src/**/*.{js,jsx,ts,tsx}",
            "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"
          ],
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

