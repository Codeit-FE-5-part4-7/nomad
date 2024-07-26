import Image from 'next/image';
import { ICON } from '@/constant/importImages';
import ProfileImage from '../ProfileImage';
import NavigationItem from '../NavigationItem';

interface IMobileSideNavProps {
  toggleSideNav: () => void;
  isSideNavVisible: boolean;
}

function SideNavigationMobileSize({ toggleSideNav, isSideNavVisible }: IMobileSideNavProps) {
  return (
    <div className={`${isSideNavVisible ? 'fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-30' : ''}`}>
      <div
        className={`fixed top-[6.9rem] left-0 w-[80%] h-full bg-white p-6 flex flex-col gap-6 items-center transform transition-transform duration-1000 z-[900] ${
          isSideNavVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ProfileImage />
        <NavigationItem />
        <div className='fixed rounded-r-[0.8rem] right-[-2.5rem] top-[2.8rem] w-[2.5rem] h-[4.0rem] bg-[black] flex items-center z-[2]'>
          <Image src={ICON.rightArrow.whiteColor.src} alt={ICON.rightArrow.whiteColor.alt} className={`${isSideNavVisible && 'scale-[-1]'} cursor-pointer`} onClick={toggleSideNav} />
        </div>
      </div>
    </div>
  );
}

export default SideNavigationMobileSize;
