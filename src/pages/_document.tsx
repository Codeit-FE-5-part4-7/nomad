/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import appKey from '@/components/Map/appkey';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko'>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* async 하면 에러 생김 */}
          <script type='text/javascript' src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services`} />
        </body>
      </Html>
    );
  }
}
