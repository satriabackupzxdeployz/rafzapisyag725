/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink:    { DEFAULT:"#0a0a0a", 2:"#1a1a1a" },
        fg2:    "#2e2e2e",
        fg3:    "#6b6b6b",
        fg4:    "#a0a0a0",
        bg2:    "#f7f7f7",
        cyan:   { DEFAULT:"#06B6D4", 2:"#22D3EE", 3:"#67E8F9", light:"#ECFEFF" },
        orange: { DEFAULT:"#FB7B25", 2:"#EA5C0B" },
        bdr:    "rgba(0,0,0,0.08)",
        bdr2:   "rgba(0,0,0,0.13)"
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        mono:    ["'Space Mono'", "monospace"],
        body:    ["'DM Sans'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        sm:  "0 2px 8px rgba(0,0,0,0.06)",
        md:  "0 6px 24px rgba(0,0,0,0.09)",
        lg:  "0 16px 48px rgba(0,0,0,0.12)",
        cyan:"0 0 0 2px rgba(6,182,212,0.3)"
      },
      borderRadius: { r:"2px" }
    }
  },
  plugins: []
};
