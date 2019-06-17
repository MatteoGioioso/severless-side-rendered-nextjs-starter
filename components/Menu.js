import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "./Styled/vars";
import { FaMoon } from "react-icons/fa";

const Container = styled.div`
  background-color: ${props =>
    props.theme[props.themeName].backgroundColorMenu} !important;
  color: ${props => props.theme[props.themeName].textColor} !important;
`;

const ListLink = styled.li`
  cursor: pointer;
  transition: all 400ms ease-in-out;

  &:hover {
    background-color: ${props =>
      props.theme[props.themeName].bgHover} !important;
  }

  &:hover span {
    transition: all 800ms ease-in-out;
    color: ${props => props.theme[props.themeName].colorHover} !important;
  }
`;

const Menu = props => {
  const [aboutModal, setAboutModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);

  return (
    <Container id="menu" themeName={props.themeName}>
      <div className="inner">
        <ul className="links">
          <ListLink onClick={props.onToggleMenu} themeName={props.themeName}>
            <Link href="/">
              <a>
                <span>Home</span>
              </a>
            </Link>
          </ListLink>

          <ListLink
            onClick={() => setAboutModal(true)}
            themeName={props.themeName}
          >
            <a>
              <span>About</span>
            </a>
          </ListLink>

          <ListLink
            onClick={() => setContactModal(true)}
            themeName={props.themeName}
          >
            <a>
              <span>Contact</span>
            </a>
          </ListLink>

          <ListLink themeName={props.themeName}>
            <a
              href="https://hirvitek.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span onClick={props.onToggleMenu}>Hirvitek site</span>
            </a>
          </ListLink>
        </ul>

        <ul className="actions vertical">
          <li>
            <a
              onClick={() => {
                props.handleThemeChange();
                props.onToggleMenu();
              }}
              className="button fit"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <FaMoon style={{ cursor: "pointer", fontSize: "20px" }}>
                Change Theme
              </FaMoon>
            </a>
          </li>
          {props.deferredPrompt && (
            <li>
              <a onClick={props.handleInstall} className="button special fit">
                Install Hirvitek Blog
              </a>
            </li>
          )}
        </ul>
      </div>
      <a className="close" onClick={props.onToggleMenu} href="javascript:;">
        Close
      </a>

      {aboutModal && <About setAboutModal={setAboutModal} />}
      {contactModal && <Contact setContactModal={setContactModal} />}
    </Container>
  );
};

export default Menu;

const About = ({ setAboutModal }) => {
  return (
    <nav id="menu">
      <div className="inner" style={{ textAlign: "left" }}>
        <h3>Hello and welcome to the Hirvitek blog</h3>
        <p>
          Here you can find articles about general Front-end engineering,
          serverless, React, progressive web application, Web assembly and
          front-end performance.
          <br />
          <br />
          Our article will treat advanced topics so don't expect "how to write
          hello world in React.js"
        </p>
      </div>
      <a className="close" onClick={() => setAboutModal(false)}>
        Close
      </a>
    </nav>
  );
};

const Contact = ({ setContactModal }) => {
  return (
    <nav id="menu">
      <div
        className="inner"
        style={{ textAlign: "left", minWidth: "310px", width: "50%" }}
      >
        <h3>
          You can drop us an email at:{" "}
          <a href="mailto:info@hirvitek.com">info@hirvitek.com</a>
        </h3>
        <p>We will make a nice form later</p>
        {/*<form method="post" action="#">*/}
        {/*  <div className="field half first">*/}
        {/*    <label htmlFor="name">Name</label>*/}
        {/*    <input type="text" name="name" id="name" />*/}
        {/*  </div>*/}
        {/*  <div className="field half">*/}
        {/*    <label htmlFor="email">Email</label>*/}
        {/*    <input type="text" name="email" id="email" />*/}
        {/*  </div>*/}
        {/*  <div className="field">*/}
        {/*    <label htmlFor="message">Message</label>*/}
        {/*    <textarea name="message" id="message" rows="6" />*/}
        {/*  </div>*/}
        {/*  <ul className="actions">*/}
        {/*    <li>*/}
        {/*      <input type="submit" value="Send Message" className="special" />*/}
        {/*    </li>*/}
        {/*    <li>*/}
        {/*      <input type="reset" value="Clear" />*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</form>*/}
      </div>
      <a className="close" onClick={() => setContactModal(false)}>
        Close
      </a>
    </nav>
  );
};
