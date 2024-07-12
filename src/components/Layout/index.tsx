import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type Children = {
  children: ReactNode;
};
export default function Layout({ children }: Children) {
  return (
    <>
      <Header />
      <div className='pt-[7rem]'>{children}</div>
      <Footer />
    </>
  );
}
