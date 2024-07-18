import { Activity } from '@/types/ActivityDetail';

const mockActivityData: Activity = {
  id: 7,
  userId: 21,
  title: '함께 배우면 즐거운 스트릿댄스',
  description: '둠칫 둠칫 두둠칫',
  category: '투어',
  price: 12345,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl: '/images/banner_main.png',
  rating: 4.74,
  reviewCount: 5,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
  subImages: [
    {
      id: 1,
      imageUrl: '/images/banner_sub.png',
    },
  ],
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2023-12-05',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
};

export default mockActivityData;
