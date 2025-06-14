import { useTheme } from "@/contexts/ThemeContext";

const ThemeDebug = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`fixed top-20 right-4 z-50 p-2 rounded text-xs ${
        theme === "light" ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      Current theme: {theme}
    </div>
  );
};

export default ThemeDebug;
