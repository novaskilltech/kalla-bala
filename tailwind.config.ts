import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#fbf9f4",
          dark: "#0b1120",
        },
        surface: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        card: {
          light: "#ffffff",
          dark: "#172033",
        },
        quran: {
          stop: "#059669", // green
          connect: "#2563eb", // blue
          prefer: "#d97706", // orange / amber
        },
      },
      fontFamily: {
        arabic: ["var(--font-cairo)", "Cairo", "system-ui", "sans-serif"],
        quran: ["var(--font-amiri)", "Amiri", "'Traditional Arabic'", "serif"],
        scheherazade: ["var(--font-scheherazade)", "Scheherazade New", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
