const Footer = props => (
  <footer id="footer">
    <div className="inner">
      <ul className="icons">
        <li>
          <a
            href="https://www.facebook.com/hirvitek"
            target="_blank"
            rel="noopener noreferrer"
            className="icon alt fa-facebook"
          >
            <span className="label">Facebook</span>
          </a>
        </li>

        <li>
          <a
            href="https://github.com/hirvitek"
            target="_blank"
            rel="noopener noreferrer"
            className="icon alt fa-github"
          >
            <span className="label">GitHub</span>
          </a>
        </li>
        {/* <li>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="icon alt fa-linkedin"
          >
            <span className="label">LinkedIn</span>
          </a>
        </li> */}

        <li>
          <a
            href="https://www.instagram.com/hirvitek/"
            target="_blank"
            rel="noopener noreferrer"
            className="icon alt fa-instagram"
          >
            <span className="label">Instagram</span>
          </a>
        </li>
      </ul>
      <ul className="copyright">
        <li>&copy; Hirvitek</li>
        <li>
          Design: Matteo Gioioso
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer;
