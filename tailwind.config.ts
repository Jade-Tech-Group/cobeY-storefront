import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: "0.5rem",
    },
    extend: {
      colors: {
        primary: {
          light: "#AE7DDD",
          DEFAULT: process.env.PRIMARY_COLOR || "#FF7A01",
          dark: "#5c156c",
        },
        secondary: {
          light: "#AE7DDD",
          DEFAULT: process.env.SECONDARY_COLOR || "#dc6d0c",
          dark: "#af590f",
        },
      },
      aspectRatio: {
        "9/8": "1 / 1.125",
      },
      screens: {
        xs: "360px",
        sm: "768px",
        md:"1024px",
        lg: "1240px",

        "2xl": "1400px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
