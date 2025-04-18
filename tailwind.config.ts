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
      background: "#dc6d0c",
    },
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        primary: {
          light: "#AE7DDD",
          DEFAULT: process.env.PRIMARY_COLOR || "#FF7A01",
          medium: "#4b1258",
          dark: "#35083f",
        },
        secondary: {
          light: "#dc6d0c4d",
          DEFAULT: process.env.SECONDARY_COLOR || "#ef7a14",
          dark: "#ef7a14",
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
