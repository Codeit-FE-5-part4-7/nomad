import ImageContainer from '@/components/ImageContainer';
import Image from 'next/image';
import { ICON } from '@/constant/importImages';

// 목업 작업중
function ActivityDetail() {
  return (
    <div className='mt-32'>
      <div className='flex flex-col gap-1 px-[18rem]'>
        <p className='text-sm text-[#333236]'>카테고리는 키티</p>
        <h1 className='text-[3.2rem] text-[#333236] font-bold'>둥글게 둥글게 타이틀</h1>
        <div className='flex gap-3'>
          <div className='flex gap-1'>
            <Image src={ICON.star.default.src} alt={ICON.star.default.alt} width={16} height={16} />
            <p>4.9</p>
            <p>(293)</p>
          </div>
          <div className='flex gap-1'>
            <Image src={ICON.mapMarker.default.src} alt={ICON.mapMarker.default.alt} width={18} height={18} />
            <p className='text-[#333236]'>사랑시 고백구 행복동</p>
          </div>
        </div>
        <ImageContainer bannerImageUrl='/images/banner_main.png' subImages={[]} />
      </div>
    </div>
  );
}

export default ActivityDetail;
