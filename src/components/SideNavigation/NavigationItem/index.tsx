// SideNavItems.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SIDE_NAV_OPTIONS from '@/constant/sideNavOptions';

function NavigationItem() {
  const router = useRouter();

  return (
    <ul className='flex flex-col w-full gap-[0.8rem]'>
      {SIDE_NAV_OPTIONS.map((item) => (
        <li className={`rounded-[1.2rem] hover:bg-[#CED8D5] group ${router.pathname === item.linkUrl ? 'bg-[#CED8D5]' : 'bg-[#FFFFFF]'}`} key={item.id}>
          <Link href={item.linkUrl} className='flex items-center gap-[1.4rem] px-[1.6rem] py-[0.9rem] text-[#DDDDDD]'>
            <Image width={24} height={24} src={router.pathname === item.linkUrl ? item.iconSrc.selected : item.iconSrc.noSelected} alt={item.iconAlt} />
            <span className={`${router.pathname === item.linkUrl ? 'text-[#112211]' : 'text-[#A4A1AA]'} text-[1.6rem] font-[700] leading-[2.6rem]`}>{item.menuTitle}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NavigationItem;
