/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'lilac': '#DBD5EF', 
      },
      fontFamily: {
        inter: ['Inter', 'sans'],
      },
    },
  },
  plugins: [],
}

