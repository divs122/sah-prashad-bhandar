/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        'heading': ['var(--font-playfair)'],
        'body': ['var(--font-poppins)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'divine-glow': 'radial-gradient(circle at center, rgba(255,153,51,0.1) 0%, rgba(255,153,51,0) 70%)',
      },
    },
  },
  plugins: [],
} 