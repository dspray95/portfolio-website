const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        "electric-blue": "rgb(0, 255, 255)",
        "hot-pink": "rgb(255, 0, 255)",
      },
      fontFamily: {
        graffiti: ["Quickzag", ...defaultTheme.fontFamily.mono],
        digital: ["ReDo", ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
