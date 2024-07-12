import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=f7adb5c4574cc3a1412885d9f0aff326&libraries=services' async />
        </body>
      </Html>
    );
  }
}
