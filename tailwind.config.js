module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#4a5568",
      },
      gradientColorStops: (theme) => ({
        primary: "#1a202c",
        secondary: "#2d3748",
        accent: "#4a5568",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
