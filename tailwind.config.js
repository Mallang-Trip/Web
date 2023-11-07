/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        // => @media (min-width: 640px) { ... }

        md: "1024px",
        // => @media (min-width: 1024px) { ... }

        lg: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
