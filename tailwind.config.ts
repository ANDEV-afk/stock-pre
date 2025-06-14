import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Theme-aware cyber colors that change based on light/dark mode
        "cyber-blue": {
          DEFAULT: "hsl(var(--cyber-blue))",
          dark: "hsl(var(--cyber-blue) / 0.8)",
          light: "hsl(var(--cyber-blue) / 0.6)",
        },
        "cyber-purple": {
          DEFAULT: "hsl(var(--cyber-purple))",
          dark: "hsl(var(--cyber-purple) / 0.8)",
          light: "hsl(var(--cyber-purple) / 0.6)",
        },
        "cyber-green": {
          DEFAULT: "hsl(var(--cyber-green))",
          dark: "hsl(var(--cyber-green) / 0.8)",
          light: "hsl(var(--cyber-green) / 0.6)",
        },
        "cyber-red": {
          DEFAULT: "hsl(var(--cyber-red))",
          dark: "hsl(var(--cyber-red) / 0.8)",
          light: "hsl(var(--cyber-red) / 0.6)",
        },
        "cyber-yellow": {
          DEFAULT: "hsl(var(--cyber-yellow))",
          dark: "hsl(var(--cyber-yellow) / 0.8)",
          light: "hsl(var(--cyber-yellow) / 0.6)",
        },
        "cyber-black": {
          DEFAULT: "hsl(var(--cyber-black))",
          dark: "hsl(var(--cyber-black) / 0.8)",
          light: "hsl(var(--cyber-black) / 0.6)",
        },
        "cyber-dark": {
          DEFAULT: "hsl(var(--cyber-dark))",
          dark: "hsl(var(--cyber-dark) / 0.8)",
          light: "hsl(var(--cyber-dark) / 0.6)",
        },
        // Static cyber theme colors (for fallback)
        cyber: {
          black: "#000000",
          dark: "#0a0a0a",
          gray: {
            900: "#111111",
            800: "#1a1a1a",
            700: "#2a2a2a",
            600: "#3a3a3a",
            500: "#5a5a5a",
            400: "#8a8a8a",
            300: "#aaaaaa",
            200: "#cccccc",
            100: "#eeeeee",
          },
          blue: {
            DEFAULT: "#007aff",
            dark: "#0056cc",
            light: "#3399ff",
            neon: "#00d4ff",
          },
          purple: {
            DEFAULT: "#5856d6",
            dark: "#3634a3",
            light: "#7b79d6",
            neon: "#a855f7",
          },
          green: {
            DEFAULT: "#34c759",
            dark: "#248a3d",
            neon: "#00ff88",
          },
          red: {
            DEFAULT: "#ff3b30",
            dark: "#d70015",
            neon: "#ff0044",
          },
          yellow: {
            DEFAULT: "#ffcc00",
            neon: "#ffff00",
          },
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "monospace"],
        cyber: ["Orbitron", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
        "3xl": ["2rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.75rem" }],
        "5xl": ["3.5rem", { lineHeight: "4rem" }],
        "6xl": ["4.5rem", { lineHeight: "5rem" }],
        "7xl": ["6rem", { lineHeight: "6.5rem" }],
        "8xl": ["8rem", { lineHeight: "8.5rem" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        120: "30rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "2rem",
      },
      boxShadow: {
        cyber: "0 0 20px rgba(0, 122, 255, 0.3)",
        "cyber-lg": "0 0 40px rgba(0, 122, 255, 0.4)",
        "cyber-xl": "0 0 60px rgba(0, 122, 255, 0.5)",
        "neon-blue": "0 0 10px #007aff, 0 0 20px #007aff, 0 0 40px #007aff",
        "neon-purple": "0 0 10px #5856d6, 0 0 20px #5856d6, 0 0 40px #5856d6",
        dark: "0 8px 32px rgba(0, 0, 0, 0.8)",
        "dark-lg": "0 16px 64px rgba(0, 0, 0, 0.9)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(0, 122, 255, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(0, 122, 255, 0.6)",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor",
          },
          "50%": {
            textShadow:
              "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
          },
        },
        matrix: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "cyber-scan": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        glow: "glow 2s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        matrix: "matrix 3s linear infinite",
        "cyber-scan": "cyber-scan 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "cyber-grid": `
          linear-gradient(rgba(0, 122, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 122, 255, 0.1) 1px, transparent 1px)
        `,
        "radial-dark":
          "radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
