/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        blackish: "#171716",
        whitish: "#F8F7F4",
        blueish: "#0D0C22",
      },
      fontFamily: {
        markazi: ["markazi", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
