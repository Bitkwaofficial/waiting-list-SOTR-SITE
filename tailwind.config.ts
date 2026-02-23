import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sahara: "#D98E04",
        ubuntu: "#5C3B1E",
        sand: "#F4E4C1",
        forest: "#256F3A",
        sunset: "#E75815",
        night: "#0C0C0C",
        warmgray: "#6B6B6B",
      },
      fontFamily: {
        sans: ["var(--font-nunito)"],
        display: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [],
};
export default config;

