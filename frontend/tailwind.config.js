/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your custom medical/wellness colors
        primary: {
          green: '#5FB88A',
          blue: '#6BA4E8',
          sage: '#A8C9B7',
        },
        bg: {
          main: '#F7F9FB',
          card: '#FFFFFF',
          secondary: '#EBF5F0',
          accent: '#E8F4F8',
        },
        text: {
          primary: '#2D3E50',
          secondary: '#6B7C8C',
          muted: '#95A5B5',
        },
        accent: {
          teal: '#4ECDC4',
          mint: '#A7E5D1',
          cream: '#FFF8E7',
        },
        status: {
          success: '#6FCF97',
          warning: '#F2C94C',
          danger: '#EB5757',
          info: '#56CCF2',
        }
      },
    },
  },
  plugins:  [],
}