import React, { ReactNode } from 'react';
import SideNavigation from '../SideNavigation';

/** 내 정보나 예약 내역등 profile이 있는 페이지들의 공통으로 나타나는 컴포넌트 */
type Children = {
  children: ReactNode;
};
export default function MyLayout({ children }: Children) {
  return (
    <div className='flex justify-center gap-x-[2.4rem] pt-[7.2rem] px-[2.4rem] bg-[#FAFAFA] max-lg:pt-[2.4rem] max-md:gap-x-[1.6rem]'>
      <nav className='w-[38.6rem] max-lg:w-[25.1rem] max-md:hidden'>
        <SideNavigation />
      </nav>
      <div className='max-w-[79.2rem] w-full'>{children}</div>
    </div>
  );
}
