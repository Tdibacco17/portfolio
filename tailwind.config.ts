import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'react': '#61DAFB',
        'redux': '#764ABC',
        'next': '#000000',
        'html': '#F37A1D',
        'css': '#4F8FD3',
        'sass': '#CC6699',
        'tailwind': '#38bdf8',
        'mysql': '#00758F',
        'mongodb': '#47A248',
        'sequelize': '#00AEEF',
        'nodejs': '#8CC84B',
        'postgresql': '#336791',
        'express': '#000000',
        'javascript': '#F7DF1E',
        'typescript': '#007ACC',
        //en uso
        "soft": '#707070',
        'lightPrimary': '#A0A0A0',
        'lightSecondary': '#EDEDED',
        'darkPrimary': '#161616',
        'darkSecondary': "#161616e6"
      },
      backgroundColor: {
        //en uso
        'darkPrimary': '#282828',
        'darkPrimaryHover': '#2e2e2e',
        'lightPrimary': '#FFFFFF',
        'lightPrimary-hover': '#ffffffe6'
      },
      borderRadius: {
        //en uso
        'custom': '8px',
        'otherCustom': '12px'
      },
      borderColor: {
        'card': '#363636',
        'card-hover': '#3e3e3e',
        'layout': '#343434',
        //en uso
        'darkPrimary': '#2e2e2e',
        'darkPrimaryHover': '#3e3e3e',
        'lightPrimary': '#ededed',
        "soft": '#707070',
      },
      fill: {
        //en uso
        "soft": '#707070',
        "softHover": '#A0A0A0',
      },
      stroke: {
        //en uso
        "soft": '#707070',
        "softHover": '#A0A0A0',
        "dark": "#161616e6"
      },
    }
  },
  plugins: [],
};
export default config;
