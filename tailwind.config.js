/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'var-modal-bg': 'rgba(0, 0, 0, 0.8)',
      },
      inset: {
        unset: 'unset',
      },
    },
  },
  plugins: [],
};
