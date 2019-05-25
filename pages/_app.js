import React from "react";
import App, { Container } from "next/app";
import * as Sentry from "@sentry/browser";
import ErrorPage from "../components/ErrorPage";

Sentry.init({
  dsn: "https://154f5d38df25449d86b5cd1a6131ddab@sentry.io/1457543"
});

class MyApp extends App {
  constructor(props) {
    super(props);

    this.state = { error: null, eventId: null };

    this.handleReportError = this.handleReportError.bind(this);
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  handleReportError() {
    Sentry.showReportDialog({ eventId: this.state.eventId });
  }

  render() {
    const { Component, pageProps } = this.props;

    if (this.state.error) {
      //render fallback UI
      return <ErrorPage handleReportError={this.handleReportError} />;
    } else {
      //when there's not an error, render children untouched
      return (
        <Container>
          <Component {...pageProps} />
        </Container>
      );
    }
  }
}

export default MyApp;
