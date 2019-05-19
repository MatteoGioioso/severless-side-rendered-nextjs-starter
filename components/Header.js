const Header = props => (
  <header id="header" className="alt">
    <nav>
      <a
        className="menu-link"
        onClick={props.onToggleMenu}
        href="javascript:;"
      />
    </nav>
  </header>
);

export default Header;
