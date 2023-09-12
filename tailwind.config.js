/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#469EFF",
        darkgray: "#666666",
        gray: "#666666",
        boldblue: "#1F6A95",
        skyblue: "#EAF4FF",
      },
    },
  },
  plugins: [],
};
