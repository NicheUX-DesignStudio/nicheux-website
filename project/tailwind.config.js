/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'sans': ['Source Sans Pro', 'sans-serif'],
      },
      colors: {
        gold: '#E9C672',
        blue: '#89B1CC',
        lavender: '#B097BE',
        black: '#121212',
      },
      fontWeight: {
        'light': 300,
        'normal': 400,
        'sans-light': 300,
        'sans-normal': 400,
        'sans-medium': 600,
      },
      fontSize: {
        'hero': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.5rem, 5vw, 2.5rem)', { lineHeight: '1.2' }],
        'subheading': ['clamp(1.25rem, 4vw, 2rem)', { lineHeight: '1.3' }],
        'body-xl': ['clamp(1.125rem, 2.5vw, 1.375rem)', { lineHeight: '1.7' }],
        'body-lg': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.8' }],
        'body': ['clamp(0.875rem, 1.8vw, 1rem)', { lineHeight: '1.8' }],
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        '7xl': '80rem',
        '8xl': '88rem',
      },
      // ADDED: Custom spacing for pagination dots
      spacing: {
        'pagination-dot': '4px',
        'pagination-gap': '6px',
      },
      // ADDED: Custom sizes for pagination dots
      width: {
        'pagination-dot': '4px',
      },
      height: {
        'pagination-dot': '4px',
      },
      // ADDED: Custom scale for active pagination dots
      scale: {
        '125': '1.25',
        'pagination-active': '1.25',
      },
      // ADDED: Arbitrary values for tiny dots
      size: {
        'pagination-dot': '4px',
      }
    },
  },
  plugins: [],
}