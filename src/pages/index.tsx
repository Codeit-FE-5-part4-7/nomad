// import Image from 'next/image';
// import styles from '@/styles/Home.module.css';
// import { useEffect, useState } from 'react';

import MainPage from '@/components/landing-page/MainPage';
import Head from 'next/head';

export default function Home() {
  // NOTE: 테스트를 위해서 typescript-eslint/no-unused-vars도 잠시 끔!
  // NOTE: ~~~한 이유로 any타입을 사용함! 과 같이 eslint를 끌땐 명확한 이유를 남겨주세요!! 단!!! 이유가 단순히 Eslint 에러를 해결하위해서 lint를 꺼선 안됩니다!!!
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  //   const [state, setState] = useState<any>(false);

  // NOTE: test를 위한 코드. 여러분들이 사용하실땐 삭제하고 사용하셔도 무방합니다!
  // NOTE: console.log, console.error 등을 남기실 땐 아래와 같은 컨벤션으로 남겨주세요!!
  //   useEffect(() => {
  //     // TODO: ~~한 이유로 console.log를 남김!
  //     // eslint-disable-next-line no-console
  //     console.log('state', state);
  //   }, [state]);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scal=1' />
        <link rel='icon' href='favicon.ico' />
        <title>Global Nomad</title>
      </Head>
      <MainPage />
    </>
  );
}
