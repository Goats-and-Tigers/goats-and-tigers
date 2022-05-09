module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      lightGray: "#7A7A7A",
      lightGreen: "#F8FFEF",
    },
  },
  fontFamily: {
    sans: ["neue-haas-grotesk-display"],
    mono: ["IBM Plex Mono"],
  },
  screens: {
    m2xl: { max: "1535px" },
    // => @media (max-width: 1535px) { ... }

    mxl: { max: "1279px" },
    // => @media (max-width: 1279px) { ... }

    mlg: { max: "1023px" },
    // => @media (max-width: 1023px) { ... }

    mmd: { max: "767px" },
    // => @media (max-width: 767px) { ... }

    msm: { max: "639px" },
    // => @media (max-width: 639px) { ... }
  },
  plugins: [],
};
