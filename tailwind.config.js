/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 0 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
} 