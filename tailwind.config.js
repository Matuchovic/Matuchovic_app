/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        foreground: '#ffffff',
        gold: {
          DEFAULT: '#D4A45F',
          light: '#E8C08A',
          dark: '#B8883A',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.03)',
          hover: 'rgba(255,255,255,0.06)',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          gold: 'rgba(212,164,95,0.2)',
        },
        muted: 'rgba(255,255,255,0.4)',
        subtle: 'rgba(255,255,255,0.2)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.04em' }],
        'heading': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'eyebrow': ['0.625rem', { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      animation: {
        'noise': 'noiseShift 0.1s steps(1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        noiseShift: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(1px, -2px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(0.9)' },
          '50%': { opacity: '0.35', transform: 'scale(1.1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      backdropBlur: {
        'glass': '24px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
