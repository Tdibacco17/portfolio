import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        wrapper: '42rem'
      },
      minWidth: {
        wrapper: '42rem'
      },
      colors: {
        'light-primary': '#FFFFFF',
        'light-secondary': '#A0A0A0',
        'black-primary': '#161616',
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
        'typescript': '#007ACC'
      },
      backgroundColor: {
        'dark-primary': '#232323',
        'dark-secondary': '#282828',
        'dark-secondary-hover': '#343434',
        'light-primary': '#FFFFFF',
      },
      fontFamily: {
        'inter': ['var(--font-inter)']
      },
      borderRadius: {
        'outer': '12px',
        'inner': '8px'
      },
      borderColor: {
        'custom': '#363636',
        'custom-hover': '#3e3e3e'
      }
    }
  },
  plugins: [],
};
export default config;
