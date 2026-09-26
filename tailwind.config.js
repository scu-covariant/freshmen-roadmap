/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 智锐科创协会官方 Logo 主题色：RGB(16, 143, 204) -> #108fcc
        brand: {
          50: '#f0f8fd',
          100: '#daf0fa',
          200: '#bae2f6',
          300: '#86ceee',
          400: '#48b3e3',
          500: '#219fd8',
          600: '#108fcc', // 官方标准色 rgb(16, 143, 204)
          700: '#0d74a7',
          800: '#0e618b',
          900: '#115173',
          950: '#0b344b',
        },
        // 映射并统一主色调，确保全站所有组件无缝继承协会主色
        indigo: {
          50: '#f0f8fd',
          100: '#daf0fa',
          200: '#bae2f6',
          300: '#86ceee',
          400: '#48b3e3',
          500: '#219fd8',
          600: '#108fcc', // 官方标准色 rgb(16, 143, 204)
          700: '#0d74a7',
          800: '#0e618b',
          900: '#115173',
          950: '#0b344b',
        },
      }
    },
  },
  plugins: [],
}
