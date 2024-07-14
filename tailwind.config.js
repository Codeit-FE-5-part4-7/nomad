/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'var-modal-bg': 'rgba(0, 0, 0, 0.8)',
        black: 'var(--color-black)',
        'nomad-black': 'var(--color-nomad-black)',
        gray: {
          500: 'var(--color-gray-500)',
          400: 'var(--color-gray-400)',
          300: 'var(--color-gray-300)',
          200: 'var(--color-gray-200)',
          100: 'var(--color-gray-100)',
          50: 'var(--color-gray-50)',
          25: 'var(--color-gray-25)',
          10: 'var(--color-gray-10)',
        },
        green: {
          DEFAULT: 'var(--color-green)',
          dark: 'var(--color-green-dark)',
          light: 'var(--color-green-light)',
        },
        red: 'var(--color-red)',
        orange: {
          DEFAULT: 'var(--color-orange)',
          light: 'var(--color-orange-light)',
        },
        yellow: 'var(--color-yellow)',
        blue: {
          DEFAULT: 'var(--color-blue)',
          light: 'var(--color-blue-light)',
          lighter: 'var(--color-blue-lighter)',
        },
      },
      inset: {
        unset: 'unset',
      },
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
