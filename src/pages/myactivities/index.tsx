import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import MyLayout from '@/components/MyLayout';
import Link from 'next/link';

const cardsData = [
  {
    id: 0,
    userId: 0,
    title: 'string',
    description: 'string',
    category: 'string',
    price: 11110,
    address: 'string',
    bannerImageUrl: '',
    rating: 20,
    reviewCount: 1110,
    createdAt: 'string',
    updatedAt: 'string',
  },
  {
    id: 1,
    userId: 1,
    title: 'string',
    description: 'string',
    category: 'string',
    price: 22220,
    address: 'string',
    bannerImageUrl: '',
    rating: 8000,
    reviewCount: 1110,
    createdAt: 'string',
    updatedAt: 'string',
  },
];

export default function MyActivities() {
  return (
    <MyLayout>
      <main className='bg-[#fafafa]'>
        <div className='flex justify-between mb-[2.4rem]'>
          <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 관리</h2>
          <Link href='/myactivities/postactivity' className='flex justify-center items-center w-[12rem] h-[4.8rem] text-[#fff] bg-[#112211] font-bold text-[1.6rem] leading-[2.6rem] rounded-[0.4rem]'>
            체험 등록하기
          </Link>
        </div>
        <AcitivitiesCardList activities={cardsData} />
      </main>
    </MyLayout>
  );
}
