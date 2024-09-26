/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ensures dark mode is enabled
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Extend if necessary
      colors: {
        primary: '#1f2937', // Example primary color
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      // Add other customizations here
    },
  },
  plugins: [],
};