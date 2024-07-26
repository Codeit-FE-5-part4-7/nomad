import ProfileImage from './ProfileImage';
import NavigationItem from './NavigationItem';

function SideNavigation() {
  return (
    <div className='md:w-[38.4rem] w-[25rem] border border-[#DDDDDD] shadow-[0_0.4rem_1.6rem_0_rgba(17,34,17,0.05)] p-[2.4rem] rounded-[1.2rem] flex flex-col gap-[2.4rem] items-center bg-[#FFFFFF] shrink-0'>
      <ProfileImage />
      <NavigationItem />
    </div>
  );
}

export default SideNavigation;
