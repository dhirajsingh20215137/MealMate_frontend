/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Make sure this covers all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
