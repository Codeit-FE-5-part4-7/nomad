/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import KAKAO_MAP_APP_KEY from '@/constant/constant';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko'>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script type='text/javascript' src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_APP_KEY}&libraries=services`} />
        </body>
      </Html>
    );
  }
}
