import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft": '#707070',
        'lightPrimary': '#A0A0A0',
        'lightSecondary': '#EDEDED',
        'darkSecondary': "#161616e6",
        'link-hover': '#a586df'
      },
      backgroundColor: {
        'darkPrimary': '#282828',
        'darkPrimaryHover': '#2e2e2e',
        'lightPrimary': '#FFFFFF',
        'lightPrimary-hover' :"#ffffffe6"
      },
      borderRadius: {
        'custom': '8px',
        'otherCustom': '12px'
      },
      borderColor: {
        'darkPrimary': '#2e2e2e',
        'lightPrimary': '#ededed',
      },
      fill: {
        "soft": '#707070',
        "softHover": '#A0A0A0',
      },
      stroke: {
        "soft": '#707070',
        "softHover": '#A0A0A0',
        "dark": "#161616e6"
      },
    }
  },
  plugins: [],
};
export default config;
