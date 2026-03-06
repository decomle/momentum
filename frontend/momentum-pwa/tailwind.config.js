/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'jammy-ooze': {
          '0%, 100%': {
            // Initial state: perfectly round and centered
            transform: 'scale(1) translate(-50%, -50%)',
            borderRadius: '50%',
          },
          '25%': {
            // Ooze slightly right and down
            transform: 'scale(1.05) translate(-47%, -47%)',
            borderRadius: '45% 55% 50% 50%',
          },
          '50%': {
            // Ooze slightly left and up
            transform: 'scale(1.02) translate(-53%, -53%)',
            borderRadius: '55% 45% 50% 50%',
          },
          '75%': {
            // Slight pulse, centered
            transform: 'scale(1.08) translate(-50%, -50%)',
            borderRadius: '50%',
          },
        }
      },
      animation: {
        // Slow and rhythmic like a pulse
        'ooze': 'jammy-ooze 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

