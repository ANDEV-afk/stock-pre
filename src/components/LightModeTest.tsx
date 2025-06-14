import { useTheme } from "@/contexts/ThemeContext";

const LightModeTest = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        background: theme === "light" ? "#000" : "#fff",
        color: theme === "light" ? "#fff" : "#000",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
      }}
    >
      <div>Theme: {theme}</div>
      <div>Background should be: {theme === "light" ? "WHITE" : "DARK"}</div>
      <button
        onClick={toggleTheme}
        style={{ marginTop: "5px", padding: "5px" }}
      >
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default LightModeTest;
