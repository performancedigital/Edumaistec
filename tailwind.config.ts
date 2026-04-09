import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: '#003366',
        brandOrange: '#FF6600',
        brandLight: '#F8FAFC',
        brandBlueLight: '#004A94',
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'shine': 'shine 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
} satisfies Config
