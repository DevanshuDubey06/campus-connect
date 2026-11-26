/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        'vice-pink': '#FF2D55',
        'vice-orange': '#FF9500',
        'vice-purple': '#9B59B6',
        'vice-cyan': '#00CED1',
        'vice-dark': '#0D0A1A',
      },
      backgroundImage: {
        'gradient-vice': 'linear-gradient(135deg, #FF2D55 0%, #FF9500 50%, #9B59B6 100%)',
        'gradient-sunset': 'linear-gradient(180deg, #1a0533 0%, #4a1942 25%, #c0392b 60%, #e67e22 85%, #f39c12 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 45, 85, 0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(255, 149, 0, 0.8)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
