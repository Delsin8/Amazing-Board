/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'success-primary': '#28a745',
        'success-hover': '#218838',
        'success-active': '#1e7e34',
        'danger-primary': '#dc3545',
        'danger-hover': '#c82333',
        'danger-active': '#bd2130',
        'warning-primary': '#ffc107',
        'warning-hover': '#e0a800',
        'warning-active': '#d39e00',
        'info-primary': '#17a2b8',
        'info-hover': '#138496',
        'info-active': '#117a8b',
        'light-primary': '#f8f9fa',
        'light-hover': '#e2e6ea',
        'light-active': '#dae0e5',
        'dark-primary': '#343a40',
        'dark-hover': '#23272b',
        'dark-active': '#1d2124',
      },
    },
  },
  plugins: [],
}
