import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header = props => {
  const [pathname, setPathname] = useState("/");

  useEffect(() => {
    setPathname(window.location.pathname)
  });

  return (
    <header id="header" className="alt">
      {pathname !== "/" && (
        <Link href="/">
          <a className="logo">Hirvitek / Blog</a>
        </Link>
      )}
      <nav>
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
