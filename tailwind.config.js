/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ,
  theme: {
    extend: {
      colors: {
        // Deep Botanical Backgrounds
        botanical: {
          DEFAULT: '#080F0E',
          card: '#11201D',
          border: '#1A332E',
        },
        // Singapore Accent Colors
        singapore: {
          crimson: '#E11D48',
          amber: '#F59E0B',
          teal: '#0D9488',
        },
        // Legacy Mappings
        brand: {
          navy: '#0F172A',
          accent: '#E11D48',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif',
      },
    },
  },
  plugins: [,
}