/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: 'repeat(auto-fit,minmax(300px,1fr))',
        'fluid-sm': 'repeat(auto-fit,minmax(200px,1fr))'
      },
      backgroundImage: {
        'hero-bg': "linear-gradient(180deg, rgba(226,232,240,0.8) 0%, rgba(38,38,38,0.8) 100%), url('/assets/hero-bg.png')"
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif']
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        wiggle: 'wiggle 5s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-6deg) translate(10px)' },
          '50%': { transform: 'rotate(6deg) translate(-10px)' }
        }
      },
      dropShadow: {
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]

      }
    }
  },
  plugins: []
}
