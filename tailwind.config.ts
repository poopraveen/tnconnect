import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TN Civic brand (matches Figma brand tokens)
        primary: {
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        // Neutral scale (Figma neutral tokens)
        neutral: {
          0:   "#FFFFFF",
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
        // SLA traffic-light tokens
        sla: {
          "on-target-bg":    "#DCFCE7",
          "on-target-fg":    "#166534",
          "vulnerable-bg":   "#FEF3C7",
          "vulnerable-fg":   "#92400E",
          "jeopardy-bg":     "#FEE2E2",
          "jeopardy-fg":     "#991B1B",
        },
        // Semantic status
        success: { 100: "#DCFCE7", 600: "#16A34A" },
        warning: { 100: "#FEF3C7", 600: "#D97706" },
        danger:  { 100: "#FEE2E2", 600: "#DC2626" },
        info:    { 100: "#DBEAFE", 600: "#2563EB" },
        surface: "#F8FAFC",
        // Keep brand.orange for legacy btn-orange class
        brand: {
          orange:       "#F97316",
          "orange-light": "#FB923C",
          "orange-dark":  "#EA580C",
        },
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        tamil: ["Noto Sans Tamil", "Inter", "system-ui", "sans-serif"],
        data:  ["Roboto Mono", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.04)",
        nav: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 40%, #0EA5E9 100%)",
        "card-gradient": "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
