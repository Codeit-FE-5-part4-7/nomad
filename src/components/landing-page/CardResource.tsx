import Image from 'next/image';
import { ICON } from '@/constant';
import { GetActivitiesList } from '@/utils/types';
import { useRouter } from 'next/router';
/* eslint-disable */
interface CardResourceProps {
  activitiesData: GetActivitiesList;
  banner: boolean;
}

export default function CardResource({ activitiesData, banner }: CardResourceProps) {
  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/activityDetail/${id}`);
  };

  return (
    <div onClick={() => handleClick(activitiesData.id)} className={`flex flex-col items-start gap-4 cursor-pointer ${banner ? 'carousel' : 'entire'}`}>
      <div className={`relative overflow-hidden rounded-2xl ${banner ? 'w-full h-full' : 'w-72 h-72'} group`}>
        <Image src={activitiesData.bannerImageUrl} width={384} height={384} alt='배너 이미지' className='transition-transform duration-300 ease-in-out transform group-hover:scale-110 object-cover' />
      </div>
      <div className={`flex flex-col gap-4 w-full ${banner ? 'bg-gradient-to-b from-transparent to-black p-12 text-white' : 'text-black'}`}>
        <div className='flex items-center gap-2 text-lg font-medium'>
          <Image src={ICON.star.active.src} width={20} height={20} alt={ICON.star.active.alt} className='inline-block' />
          {activitiesData.rating}
          &nbsp;
          <span className='text-gray-400'>({activitiesData.reviewCount})</span>
        </div>
        <div className={`truncate ${banner ? 'text-3xl font-bold' : 'text-xl font-semibold'}`}>{activitiesData.title}</div>
        <div className={`flex items-center gap-2 ${banner ? 'text-2xl font-bold' : 'text-3xl font-bold'}`}>
          {activitiesData.price === 0 ? (
            '무료체험'
          ) : (
            <>
              ￦ {activitiesData.price.toLocaleString()} <span className='text-gray-400 text-lg'>/ 인</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* eslint-enable */
