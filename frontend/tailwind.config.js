/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0E1620', // Hero & Dark sections
          900: '#121C28',
          800: '#163758', // Deep brand blue / text
          700: '#1F476F',
          muted: '#536773',
          subtle: '#63717C',
          light: '#C6D1DA',
        },
        copper: {
          DEFAULT: '#BB734D', // CHC Accent button / highlights
          dark: '#A35F3C',
          light: '#D49A78',
          subtle: '#F7EDE7',
        },
        surface: {
          white: '#FFFFFF',
          light: '#F3F5F7', // Neutral off-white sections
          border: '#CCD4DA',
          borderDark: 'rgba(255,255,255,0.18)',
        }
      },
      fontFamily: {
        display: ['"Antonio"', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Inter"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
