import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    //your code here
    return {}
  }

  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>Serverless blog</title>

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
