import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { colors } from "../Styled/vars";

const theme = {
  morning: {
    backgroundColor: colors.whitebg,
    backgroundColorMenu: colors.menubg,
    backgroundColorHover: colors.whitebg_2,
    textColor: colors.bgalt,
    bgHover: colors.bgalt,
    colorHover: colors.whitebg
  },
  night: {
    backgroundColor: colors.bgalt,
    backgroundColorMenu: colors.bgalt_2,
    backgroundColorHover: colors.accent1,
    textColor: colors.whitebg,
    bgHover: colors.whitebg,
    colorHover: colors.bgalt
  }
};

export const StoreContext = React.createContext({});

export const StoreProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("morning");
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  function handleThemeChange() {
    const nextThemeName = themeName === "morning" ? "night" : "morning";
    setThemeName(nextThemeName);
  }

  return (
    <StoreContext.Provider
      value={{
        themeName,
        deferredPrompt,
        handleThemeChange,
        setDeferredPrompt
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StoreContext.Provider>
  );
};

export const withStoreConsumer = WrapperComponent => props => {
  return (
    <StoreContext.Consumer>
      {value => <WrapperComponent {...value} {...props} />}
    </StoreContext.Consumer>
  );
};
