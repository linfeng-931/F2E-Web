/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./分頁/**/*.html", "./分頁/**/*.js"],
  theme: {
    extend: {
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
      },
      fontFamily: {
        Cinzel: '"Cinzel", serif',
        Josefin: '"Josefin Sans", sans-serif',
      },
      fontSize: {
        "2r": "2rem",
      },
      colors: {
        B100: "#8EB4D9",
        B200: "#0B71D7",
        B300: "#44688B",
        B400: "#023850",
        B500: "#091454",
      },
      backgroundImage: {
        mainBg: "url('./image/background.svg')",
        cliff: "url('./image/cliff.svg')",
        wave: "url('./image/wave03.svg')",
        outside: "url('./image/olia-gozha-u7xln_gMQyY-unsplash.jpg')",
        indoor: "url('./image/le-quan-mPzjn-ix_O0-unsplash.jpg')",
        food: "url('./image/farhad-ibrahimzade-S92tBP-BvwQ-unsplash.jpg')",
        paint: "url('./image/karl-solano-eQ-8iUrb07g-unsplash.jpg')",
        construction: "url('./image/jamar-penny-ZgmGq_eFmUs-unsplash.jpg')",
        footerBg: "url('./image/footer-wave.svg')",
      },
      backgroundPosition: {
        TC: "top center",
      },
      backgroundSize: {
        "80%": "80%",
        "100%": "100%",
        "120%": "120%",
        "140%": "140%",
        "200%": "200%",
        "250%": "250%",
      },

      translate: {
        25: "-25%",
        50: "-50%",
        65: "-65%",
        80: "-80%",
        130: "-130%",
        140: "-140%",
      },

      letterSpacing: {
        s2: "0.2rem",
      },

      lineHeight: {
        lh3: "3rem",
        lh35: "3.5rem",
      },
      minHeight: {
        14: "3.5rem",
      },

      minWidth: {
        14: "3.5rem",
      },

      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.2, 1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};
