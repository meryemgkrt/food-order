/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffbe33", // Ana vurgu rengi
        secondary: "#222831", // İkincil vurgu rengi
        accent: "#4ecdc4", // Dikkat çeken alanlar için
        neutral: "#f7f7f7", // Nötr arka plan rengi
        dark: "#1a202c", // Koyu tema rengi
        light: "#f9fafb", // Açık tema arka plan
        background: "var(--background)", // Tema desteği için
        foreground: "var(--foreground)", // Tema desteği için
        info: "#3ABFF8", // Bilgi mesajları için
        success: "#36D399", // Başarılı işlemler için
        warning: "#FBBD23", // Uyarılar için
        danger: "#F87272", // Hatalar için
      },
      fontFamily: {
        electrolize: ["Electrolize", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)",
        button: "0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  
};
