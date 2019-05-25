import Link from "next/link";

const Menu = props => (
  <nav id="menu">
    <div className="inner">
      <ul className="links">
        <li>
          <Link href="/">
            <a>
              <span onClick={props.onToggleMenu}>Home</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/landing">
            <a>
              <span onClick={props.onToggleMenu}>About</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/generic">
            <a>
              <span onClick={props.onToggleMenu}>Contact</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/elements">
            <a>
              <span onClick={props.onToggleMenu}>Elements</span>
            </a>
          </Link>
        </li>
        <li>
          <a
            href="https://hirvitek.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span onClick={props.onToggleMenu}>Hirvitek</span>
          </a>
        </li>
      </ul>
      {/*<ul className="actions vertical">*/}
      {/*    <li><a href="#" className="button special fit">Get Started</a></li>*/}
      {/*    <li><a href="#" className="button fit">Log In</a></li>*/}
      {/*</ul>*/}

    </div>
    <a className="close" onClick={props.onToggleMenu} href="javascript:;">
      Close
    </a>
  </nav>
);

export default Menu;
