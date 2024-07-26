import Image from 'next/image';
import { ICON, IMAGE } from '@/constant/importImages';
import postProfileImgUrl from '@/apis/post/postProfileImgUrl';
import patchMyprofile from '@/apis/patch/patchMyProfile';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MyInfoProps } from '@/utils/types';

function ProfileImage() {
  const { data } = useQuery<MyInfoProps>({ queryKey: ['myInfo'] });
  const [image, setImage] = useState<string>();

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
    <div className='relative'>
      <Image width={160} height={160} className='size-[16rem] rounded-[50%] object-fill' src={image || IMAGE.avatar.default.src} alt={IMAGE.avatar.default.alt} />
      <label htmlFor='profile-btn' className='size-[4.4rem] bg-[#0B3B2D] rounded-[50%] flex justify-center items-center absolute bottom-0 right-[1.25rem] cursor-pointer'>
        <Image width={24} height={24} src={ICON.pen.default.src} alt={ICON.pen.default.alt} />
      </label>
      <input type='file' id='profile-btn' className='hidden' onChange={handleImage} />
    </div>
  );
}

export default ProfileImage;
