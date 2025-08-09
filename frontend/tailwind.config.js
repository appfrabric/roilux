/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wood-light': '#DEB887',
        'wood-medium': '#BC9A6A',
        'wood-dark': '#8B7355',
        'leaf-green': '#90C695',
        'forest-green': '#2D5233',
        'sage-green': '#B8D4A8',
        'light-green': '#E8F5E8',
        'wood-green': '#C5D3B8',
        'dark-green': '#1B4D3E',
        'cream': '#FFF8DC',
        'sand': '#F4E4C1',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.8s ease-in',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}