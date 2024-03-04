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
        mediumgray: "#D9D9D9",
        boldgray: "#3E3E3E",
        textgray: "#BABABA",
        boldblue: "#1F6A95",
        skyblue: "#EAF4FF",
        gray300: "#EFEFEF",
        gray400: "#C8C8C8",
        gray700: "#484649",
        gray800: "#313033",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      height: {
        "real-screen": "calc(var(--vh) * 100)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
