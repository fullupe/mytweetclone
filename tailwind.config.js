module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        twittercolor:"#00ADED"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
