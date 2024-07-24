import Image from 'next/image';
import { ICON, IMAGE } from '@/constant/importImages';
import SIDE_NAV_OPTIONS from '@/constant/sideNavOptions';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import postProfileImgUrl from '@/apis/post/postProfileImgUrl';
import patchMyprofile from '@/apis/patch/patchMyProfile';
import { useQuery } from '@tanstack/react-query';
import { MyInfoProps } from '@/utils/types';

function SideNavigation() {
  const { data } = useQuery<MyInfoProps>({
    queryKey: ['myInfo'],
  });

  const [image, setImage] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (data?.profileImageUrl) {
      setImage(data.profileImageUrl);
    }
  }, [data]);

  const handlePatchProfileImg = async (profileImageUrl: string) => {
    await patchMyprofile({ profileImageUrl });
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (reader.readyState === 2) {
        setImage(event.target?.result as string);
      }
    };

    const imgData = new FormData();
    imgData.append('image', file);

    const result = await postProfileImgUrl(imgData);

    if (result?.status === 201) {
      const { profileImageUrl } = result.data;
      handlePatchProfileImg(profileImageUrl);
    }
  };

  return (
    <div className='md:w-[38.4rem] w-[25rem] border border-[#DDDDDD] shadow-[0_0.4rem_1.6rem_0_rgba(17,34,17,0.05)] p-[2.4rem] rounded-[1.2rem] flex flex-col gap-[2.4rem] items-center bg-[#FFFFFF] shrink-0'>
      <div className='relative'>
        <Image width={160} height={160} className='size-[16rem] rounded-[50%] object-fill' src={image || IMAGE.avatar.default.src} alt={IMAGE.avatar.default.alt} />
        <label htmlFor='profile-btn' className='size-[4.4rem] bg-[#0B3B2D] rounded-[50%] flex justify-center items-center absolute bottom-0 right-[1.25rem] cursor-pointer'>
          <Image width={24} height={24} src={ICON.pen.default.src} alt={ICON.pen.default.alt} />
        </label>
        <input type='file' id='profile-btn' className='hidden' onChange={handleImage} />
      </div>

      <ul className='flex flex-col w-full gap-[0.8rem]'>
        {SIDE_NAV_OPTIONS.map((item) => (
          <li className={`rounded-[1.2rem] hover:bg-[#CED8D5] group ${router.pathname === item.linkUrl ? 'bg-[#CED8D5]' : 'bg-[#FFFFFF]'}`} key={item.id}>
            <Link href={item.linkUrl} className='flex items-center gap-[1.4rem] px-[1.6rem] py-[0.9rem] text-[#DDDDDD]'>
              <Image width={24} height={24} src={router.pathname === item.linkUrl ? item.iconSrc.selected : item.iconSrc.noSelected} alt={item.iconAlt} />
              <span className={`${router.pathname === item.linkUrl ? 'text-[#112211]' : 'text-[#A4A1AA]'} text-[1.6rem] font-[700] leading-[2.6rem] ]`}>{item.menuTitle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavigation;
