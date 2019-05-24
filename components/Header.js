import Link from 'next/link'

const Header = props => (
  <header id="header" className="alt">
    <Link href="/">
      <a className="logo">
        Hirvitek / Blog
      </a>
    </Link>

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
