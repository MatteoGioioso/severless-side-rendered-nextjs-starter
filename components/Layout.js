import stylesheet from "styles/main.scss";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import React from "react";
import { Notification } from "react-notification";
import { initGA, logPageView } from "../services/GoogleAnalytics";
import {
  registerServiceWorker,
  checkForServiceWorkerUpdate
} from "../services/helpers";
import { colors } from "./Styled/vars";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuVisible: false,
      loading: "is-loading",
      isNotificationOpen: false
    };

    this.worker = null;

    this.handleToggleMenu = this.handleToggleMenu.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: "" });
    }, 100);

    registerServiceWorker(reg => {
      reg.addEventListener(
        "updatefound",
        checkForServiceWorkerUpdate(this, reg)
      );
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", function() {
        window.location.reload();
      });
    }

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

  render() {
    return (
      <div
        className={`body ${this.state.loading} ${
          this.state.isMenuVisible ? "is-menu-visible" : ""
        }`}
      >
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />

        <div id="wrapper">
          <Header onToggleMenu={this.handleToggleMenu} />
          {this.props.children}
          <Footer />
        </div>
        <Menu onToggleMenu={this.handleToggleMenu} />

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
          actionStyle={{ color: colors.other1 }}
        />
      </div>
    );
  }
}

export default Layout;
