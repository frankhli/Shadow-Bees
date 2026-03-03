/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0F19',
          800: '#151B2B',
          700: '#1E2538',
          600: '#2A324A',
          500: '#3A4560',
        },
        neon: {
          cyan: '#00D9FF',
          purple: '#A855F7',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
        }
      },
    },
  },
  plugins: [],
}
