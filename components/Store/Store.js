import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { colors } from "../Styled/vars";

const theme = {
  morning: {
    backgroundColor: colors.whitebg,
    textColor: colors.bgalt
  },
  night: {
    backgroundColor: colors.bgalt,
    textColor: colors.whitebg
  }
};

export const StoreContext = React.createContext({});

export const StoreProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("morning");

  function handleThemeChange() {
    const nextThemeName = themeName === "morning" ? "night" : "morning";
    setThemeName(nextThemeName);
  }

  return (
    <StoreContext.Provider
      value={{
        themeName,
        handleThemeChange
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
