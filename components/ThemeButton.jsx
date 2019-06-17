import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const styles = {
  icon: {
    cursor: "pointer",
    fontSize: "20px"
  }
};

const ThemeButton = ({ themeName, style, ...props }) => {
  return themeName === "morning" ? (
    <FaMoon style={{ ...styles.icon, ...style }} {...props} />
  ) : (
    <FaSun style={{ ...styles.icon, ...style }} {...props} />
  );
};

export default ThemeButton;
