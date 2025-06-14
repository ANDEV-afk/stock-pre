import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";

const WhiteBackgroundEnforcer = () => {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "light") {
      // Force white background on everything and remove all gradients
      const style = document.createElement("style");
      style.textContent = `
        html, body, #root {
          background: #ffffff !important;
        }
        .light,
        .light *,
        .light *::before,
        .light *::after {
          background: #ffffff !important;
          background-image: none !important;
          background-gradient: none !important;
          background-color: #ffffff !important;
        }
        .light body {
          background: #ffffff !important;
        }
        /* Allow specific button backgrounds */
        .light button:not(.bg-white) {
          background: transparent !important;
        }
        .light .bg-blue-500,
        .light .bg-blue-600,
        .light .bg-green-500,
        .light .bg-green-600,
        .light .bg-purple-500,
        .light .bg-purple-600 {
          background: var(--tw-bg-color) !important;
        }
        /* Keep gradient text working */
        .light .bg-gradient-to-r,
        .light .bg-gradient-to-br,
        .light .bg-gradient-to-bl,
        .light .bg-gradient-to-tl,
        .light .bg-gradient-to-t,
        .light .bg-gradient-to-b,
        .light .bg-gradient-to-l {
          background: var(--tw-gradient-stops) !important;
        }
        /* Remove any video overlays or gradients */
        .light [class*="gradient"],
        .light [class*="overlay"],
        .light [class*="background"] {
          background: transparent !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [theme]);

  return null;
};

export default WhiteBackgroundEnforcer;
