/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '768px',
        xlg: '991px',
        lg: '1024px',
        xl: '1440px',
      },
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        primary: {
          DEFAULT: 'var(--primary)',
          80: 'var(--primary-80)',
          60: 'var(--primary-60)',
          40: 'var(--primary-40)',
          30: 'var(--primary-30)',
          20: 'var(--primary-20)',
          'shade-80': 'var(--primary-shade-80)',
          'shade-60': 'var(--primary-shade-60)',
          'shade-40': 'var(--primary-shade-40)',
          'shade-30': 'var(--primary-shade-30)',
          'shade-20': 'var(--primary-shade-20)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          80: 'var(--secondary-80)',
          60: 'var(--secondary-60)',
          40: 'var(--secondary-40)',
          30: 'var(--secondary-30)',
          20: 'var(--secondary-20)',
          10: 'var(--secondary-10)',
        },
        gray: {
          DEFAULT: 'var(--gray)',
          80: 'var(--gray-80)',
          60: 'var(--gray-60)',
          40: 'var(--gray-40)',
          30: 'var(--gray-30)',
          20: 'var(--gray-20)',
          10: 'var(--gray-10)',
          'shades-100': 'var(--gray-shades-100)',
          'shades-80': 'var(--gray-shades-80)',
          'shades-60': 'var(--gray-shades-60)',
          'shades-40': 'var(--gray-shades-40)',
          'shades-30': 'var(--gray-shades-30)',
          'shades-20': 'var(--gray-shades-20)',
          'shades-10': 'var(--gray-shades-10)',
        },
        success: {
          DEFAULT: 'var(--success)',
          80: 'var(--success-80)',
          60: 'var(--success-60)',
          40: 'var(--success-40)',
          30: 'var(--success-30)',
          20: 'var(--success-20)',
          10: 'var(--success-10)',
        },
        error: {
          DEFAULT: 'var(--error)',
          80: 'var(--error-80)',
          60: 'var(--error-60)',
          40: 'var(--error-40)',
          30: 'var(--error-30)',
          20: 'var(--error-20)',
          10: 'var(--error-10)',
        },
        card: {
          error: 'var(--card-error)',
          success: 'var(--card-success)',
          warning: 'var(--card-warning)',
        },
      },
    },
  },
  plugins: [],
};