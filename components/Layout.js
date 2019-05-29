import stylesheet from "styles/main.scss";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import React from "react";
import { Notification } from "react-notification";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuVisible: false,
      loading: "is-loading"
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ loading: "" });
    }, 100);
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

        <Notification
          isActive={this.props.isNotificationOpen}
          message="A new update is available"
          action="Click to reload"
          onClick={this.props.handleNotificationClick}
        />
      </div>
    );
  }
}

export default Layout;
