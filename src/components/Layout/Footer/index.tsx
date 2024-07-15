import Image from 'next/image';
import Link from 'next/link';
import faceBookIcon from 'public/svgs/akar-icons_facebook-fill.svg';
import instagramIcon from 'public/svgs/ant-design_instagram-filled.svg';
import twitterIcon from 'public/svgs/akar-icons_twitter-fill.svg';
import youtubeIcon from 'public/svgs/akar-icons_youtube-fill.svg';

function Footer() {
  return (
    <footer className='bottom-0 left-0 right-0 flex justify-center w-full h-64 bg-footer-bg '>
      <div className='flex flex-col justify-center items-center w-full px-[3.2rem] text-gray-500 text-[1.6rem] max-w-[120rem] h-[16rem] md:flex md:flex-row md:justify-between'>
        <span className='hidden md:block'>©codeit - 2023</span>
        <div className='flex gap-12 justify-center'>
          <span className='md:hidden'>©codeit - 2023</span>
          <Link href='/privacy-policy' className='hover:text-gray-700'>
            Privacy Policy
          </Link>
          <Link href='/faq' className='hover:text-gray-700'>
            FAQ
          </Link>
        </div>
        <div className='flex gap-4 justify-center mt-8 md:mt-0 md:justify-end'>
          <Link href='https://facebook.com/' target='_blank' rel='noopener noreferrer'>
            <Image src={faceBookIcon} alt='페이스북 로고' />
          </Link>
          <Link href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
            <Image src={twitterIcon} alt='트위터 로고' />
          </Link>
          <Link href='https://youtube.com/' target='_blank' rel='noopener noreferrer'>
            <Image src={youtubeIcon} alt='유튜브 로고' />
          </Link>
          <Link href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
            <Image src={instagramIcon} alt='instagram 로고' />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
