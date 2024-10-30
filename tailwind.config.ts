import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        custom: {
          primary: '#1B3F8D',
          secondary: '#33B0E2',
          accents: '#EA7402',
          text: '#787878',
          yellow: '#FFC800',
          red: '#DF0D13'
        }
      },
    },
  },
  plugins: [],
};
export default config;
