import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({renderPage}) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return {...page, styleTags};
  }

  render() {
    return (
      <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="theme-color" content="#02394a"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>

        {/*<link rel="manifest" href="../static/manifest.json"/>*/}

        <link
          href="https://fonts.googleapis.com/css?family=Work+Sans:100,200,300,400,500:600:700"
          rel="stylesheet"
        />

        <script async
                src="https://cdn.jsdelivr.net/npm/intersection-observer-polyfill@0.1.0/dist/IntersectionObserver.js"/>

        <link href="/static/css/skel.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

        <title>Hirvitek blog</title>

        {this.props.styleTags}
      </Head>
      <body className="custom_class">
      <Main/>
      <NextScript/>
      </body>
      </html>
    )
  }
}