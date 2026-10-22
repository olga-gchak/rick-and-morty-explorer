import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#09090B',
          800: '#0E0E12',
          700: '#141419',
          600: '#1C1C23',
          500: '#26262F',
        },
        brand: {
          DEFAULT: '#FF1E6F',
          strong: '#E6005C',
          soft: '#FF5C96',
          violet: '#7C3AED',
        },
        status: {
          alive: '#37FF8B',
          dead: '#FF4D4D',
          unknown: '#9CA3AF',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,30,111,0.4), 0 8px 40px -8px rgba(255,30,111,0.5)',
        'glow-soft': '0 10px 40px -12px rgba(124,58,237,0.5)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          from: {opacity: '0', transform: 'translateY(12px)'},
          to: {opacity: '1', transform: 'translateY(0)'},
        },
        shimmer: {
          '100%': {transform: 'translateX(100%)'},
        },
      },
      animation: {
        'fade-up': 'fade-up 0.4s ease-out both',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
