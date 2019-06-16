import stylesheet from "styles/main.scss";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import React from "react";
import { Notification } from "react-notification";
import { initGA, logPageView } from "../services/GoogleAnalytics";
import {
  registerServiceWorker,
  checkForServiceWorkerUpdate,
  deferInstallPrompt
} from "../services/helpers";
import styled from "styled-components";
import { colors } from "./Styled/vars";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Wrapper = styled.div`
  background-color: ${props =>
    props.theme[props.themeName].backgroundColor} !important;
  color: ${props => props.theme[props.themeName].textColor} !important;
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false,
      loading: "is-loading",
      isNotificationOpen: false,

      isPrivacyConsentOpen: false,

      deferredPrompt: null
    };

    this.worker = null;

    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.checkPrivacyPolicyConsent = this.checkPrivacyPolicyConsent.bind(this);
    this.handlePrivacyConsentClick = this.handlePrivacyConsentClick.bind(this);
    this.handleInstall = this.handleInstall.bind(this);
  }

  checkPrivacyPolicyConsent() {
    const consent = cookies.get("cookieconsent_status");
    if (!consent) {
      this.setState({ isPrivacyConsentOpen: true });
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: "" });
    }, 100);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", function() {
        window.location.reload();
      });
    }

    this.checkPrivacyPolicyConsent();

    registerServiceWorker(reg => {
      reg.addEventListener(
        "updatefound",
        checkForServiceWorkerUpdate(this, reg)
      );
    });

    deferInstallPrompt(deferredPrompt => this.setState({ deferredPrompt }));

    navigator.serviceWorker.addEventListener("controllerchange", function() {
      window.location.reload();
    });

    initGA();
    logPageView();
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  handleToggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible
    });
  }

  handleNotificationClick() {
    if (this.worker) {
      this.worker.postMessage({ action: "skipWaiting" });
    }
  }

  handlePrivacyConsentClick() {
    cookies.set("cookieconsent_status", "dismiss", {
      expires: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000)
    });
    this.setState({ isPrivacyConsentOpen: false });
  }

  handleInstall() {
    const { deferredPrompt } = this.state;

    if (deferredPrompt) {
      deferredPrompt.prompt();
      console.log(deferredPrompt);
      deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === "accepted") {
          //Log the event with google analytics
          console.log("Your PWA has been installed");
        } else {
          console.log("User chose to not install your PWA");
        }

        this.setState({ deferredPrompt: null });
      });
    }
  }

  render() {
    return (
      <div
        className={`body ${this.state.loading} ${
          this.state.isMenuVisible ? "is-menu-visible" : ""
        }`}
      >
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

        <Wrapper id="wrapper" themeName={this.props.themeName}>
          <Header onToggleMenu={this.handleToggleMenu} />
          {this.props.children}
          <Footer />
        </Wrapper>
        <Menu
          onToggleMenu={this.handleToggleMenu}
          handleInstall={this.handleInstall}
          deferredPrompt={this.state.deferredPrompt}
        />

        {/* Display if app has been updated*/}
        <Notification
          isActive={this.state.isNotificationOpen}
          message="A new update is available"
          action="Click to reload"
          onClick={this.handleNotificationClick}
          style={{
            background: colors.accent1,
            color: colors.whitebg
          }}
          actionStyle={{ color: "#f45c42" }}
        />

        <Notification
          isActive={this.state.isPrivacyConsentOpen}
          message={Message()}
          action="OK"
          onClick={this.handlePrivacyConsentClick}
          style={{
            background: colors.accent1,
            color: colors.whitebg
          }}
          actionStyle={{ color: "#f45c42", marginLeft: 0, fontSize: "16px" }}
          barStyle={{ maxWidth: "300px", zIndex: "999" }}
        />
      </div>
    );
  }
}

export default Layout;

const Message = () => {
  return (
    <div>
      This website use cookies for statistics purposes. By visiting it you will
      accept our{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://hirvitek.com/privacyPolicy"
      >
        privacy policy
      </a>
    </div>
  );
};
