/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#6B001A',
        'primary-light': '#8C0020',
        'primary-dark': '#570014',
        secondary: '#F1EBE0',
        'secondary-light': '#F8F4ED',
        'secondary-dark': '#E6D9C0',
        accent: '#D2B048',
        'accent-light': '#E4C868',
        'accent-dark': '#B89528',
        neutral: {
          50: '#FAF6F0',
          100: '#F1EBE0',
          200: '#E6D9C0',
          300: '#D3C4A8',
          400: '#BEAA88',
          500: '#A69068',
          600: '#8A7652',
          700: '#685A3D',
          800: '#463D29',
          900: '#2D2415',
        },
        surface: {
          lightest: '#F8F4ED',
          light: '#F1EBE0',
          medium: '#E6D9C0',
          dark: '#D3C4A8',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-15px)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 500ms ease forwards',
        fadeOut: 'fadeOut 300ms ease forwards',
      },
    },
  },
  plugins: [],
};