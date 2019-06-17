import React from "react";

const Footer = props => {
  return (
    <footer id="footer">
      <div className="inner" style={{padding: '1em 0 0.25em 0'}}>
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
        {/*</li> *!/*/}

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
          <li>Design: Matteo Gioioso</li>
          <li>
            <a href="mailto:info@hirvitek.com">info@hirvitek.com</a>
          </li>

          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://hirvitek.com/privacyPolicy"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
