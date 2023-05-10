/** @type {import('tailwindcss').Config} */
module.exports = {
  screens: {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
    xl: "1400px",
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
