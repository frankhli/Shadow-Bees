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
        // 暗色主题配色（参考 shadow-bees）
        dark: {
          900: '#0B0F19',  // 最底层背景
          800: '#151B2B',  // 卡片背景
          700: '#1E2538',  // hover 背景
          600: '#2A324A',  // 边框
          500: '#3A4560',  // 次要边框
        },
        // 霓虹强调色
        neon: {
          cyan: '#00D9FF',
          purple: '#A855F7',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
