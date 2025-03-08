import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF9933', // Saffron
        'secondary': '#E6F4EA', // Light pastel green
        'accent': '#FFB347', // Light saffron
        'divine': '#FFF5E6', // Soft beige
        'spiritual': '#F8F4F1', // Off-white
        'text-primary': '#333333',
      },
      fontFamily: {
        'heading': ['var(--font-playfair)', 'serif'],
        'body': ['var(--font-poppins)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'divine-glow': 'radial-gradient(circle at center, rgba(255,153,51,0.1) 0%, rgba(255,153,51,0) 70%)',
      },
    },
  },
  plugins: [],
}

export default config 