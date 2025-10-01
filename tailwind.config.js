/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-green': '#00ff41',
        'terminal-brown': '#3d2817',
        'vault-blue': '#41a7ff',
        'nuclear-yellow': '#ffff00',
        'radiation-red': '#ff0000',
      },
      fontFamily: {
        'mono': ['Share Tech Mono', 'VT323', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanlines': 'scanlines 0.1s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glow: {
          '0%': { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41' },
          '100%': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' },
        },
        scanlines: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'terminal': '0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 20px rgba(0, 255, 65, 0.1)',
        'crt': '0 0 30px rgba(0, 255, 65, 0.5)',
      },
    },
  },
  plugins: [],
}
