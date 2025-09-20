const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        "electric-blue": "rgb(0, 255, 255)",
        "hot-pink": "rgb(255, 0, 255)",
        "space-blue": "#111827",
      },
      fontFamily: {
        graffiti: ["Quickzag", ...defaultTheme.fontFamily.mono],
        digital: ["ReDo", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        "fade-in-out": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))",
          },
          "50%": {
            filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 1))",
          },
        },

        "glitch-flicker": {
          // A quick, subtle jump/opacity change
          "0%": { transform: "translate(0px, 0px)" },
          "2%": { transform: "translate(-3px, 3px)" }, // Small jump
          "4%": { transform: "translate(3px, -3px)" }, // Another small jump
          "6%": { transform: "translate(0px, 0px)" }, // Back to normal
          "20%, 25%": { opacity: "0.8" }, // Brief dimming
          "26%, 30%": { opacity: "1" }, // Back to full opacity
        },
        "glitch-flicker-late": {
          // A quick, subtle jump/opacity change
          "20%": { transform: "translate(0px, 0px)" },
          "22%": { transform: "translate(3px, -3px)" }, // Small jump
          "24%": { transform: "translate(-3px, 3px)" }, // Another small jump
          "26%": { transform: "translate(0px, 0px)" }, // Back to normal
          "40%, 45%": { opacity: "0.8" }, // Brief dimming
          "46%, 50%": { opacity: "1" }, // Back to full opacity
        },
        "fade-in-from-below": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-to-below": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 1.2s linear infinite",
        spin: "spin 4s linear infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
        "glitch-flicker": "glitch-flicker 6s linear infinite",
        "glitch-flicker-late": "glitch-flicker-late 6s linear infinite",
        "enter-toast": "fade-in-from-below 0.25s ease-out forwards",
        "exit-toast": "fade-out-to-below 0.25s ease-in forwards",
      },
    },
  },
};
