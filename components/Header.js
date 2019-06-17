import Link from "next/link";
import React from "react";
import ThemeButton from "./ThemeButton";

const Header = props => {
  return (
    <header id="header" className="alt">
      <Link href="/">
        <a className="logo">Hirvitek / Blog</a>
      </Link>

      <nav>
        <ThemeButton
          themeName={props.themeName}
          style={{ margin: "auto 0" }}
          onClick={props.handleThemeChange}
        />
        <a
          className="menu-link"
          onClick={props.onToggleMenu}
          href="javascript:;"
        />
      </nav>
    </header>
  );
};

export default Header;
