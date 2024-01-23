/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#469EFF",
        darkgray: "#666666",
        lightgray: "#F4F4F4",
        boldblue: "#1F6A95",
        skyblue: "#EAF4FF",
      },
      screens: {
        sm: "640px",
        md: "1024px",
        lg: "1280px",
      },
      height: {
        "real-screen": "calc(var(--vh) * 100)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
