/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'resume-charcoal': '#333333',
        'resume-slate': '#515151',
        'resume-light-gray': '#e5e5e5',
        'resume-navy': '#172B4D',
        'resume-accent-blue': '#0065FF',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}