import Link from 'next/link';
import Image from 'next/image';
import { IMAGE } from '@/constant';

const { logo } = IMAGE;

export default function FormHeader() {
  return (
    <div className='flex justify-center w-full'>
      <Link href='/'>
        <div className='relative md:w-[34rem] md:h-[19.2rem] w-[27rem] h-[15.4rem]'>
          <Image className='w-full h-full object-cover' src={logo.auth.src} alt={logo.auth.alt} sizes='100%' fill priority />
        </div>
      </Link>
    </div>
  );
}
