/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'; // <-- 1. Import the plugin

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography, // <-- 2. Use the imported plugin here
  ],
}