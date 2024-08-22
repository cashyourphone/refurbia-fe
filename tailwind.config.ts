import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'complex-gradient': 'linear-gradient(to right, #fdfefe 40%, #CCC2DC 60%)',
        'main-complex-gradient':'linear-gradient(to bottom, #CCC2DC 40%, #fdfefe 60%)'
      },
      colors: {
        "background": "#CCC2DC",
        "primary": "#6650a4",
        "white":"#fdfefe"
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        bounce: 'bounce 0.5s ease-in-out infinite',
      },
      screens: {
        "custom-sm": "600px",
        "custom-md": "900px"
      }
    },
  },
  plugins: [
  ],
};
export default config;
