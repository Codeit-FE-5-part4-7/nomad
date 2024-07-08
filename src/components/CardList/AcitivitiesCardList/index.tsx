// 실제 데이터로 시험해보지는 않아서 버그있을 수 있음
import Card from '../../Card';
import MyActibitiyCardInfo from '../../Card/myActibityCardInfo';
import NoCards from '../NoCards';

export interface CardsData {
  cursorId: number;
  totalCount: number;
  activities: [
    {
      id: number;
      userId: number;
      title: string;
      description: string;
      category: string;
      price: number;
      address: string;
      bannerImageUrl: string;
      rating: number;
      reviewCount: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

interface ActibityCardData {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  address?: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt?: string;
  updatedAt?: string;
}

/** 카드리스트 컴포넌트 : 카드를 나열하는 컴포넌트 */
export default function AcitivitiesCardList({ activities }: { activities: ActibityCardData[] }) {
  return (
    <div>
      {activities.length ? (
        <div className='flex flex-col gap-y-[2.4rem] max-md:gap-y-[1.6rem]'>
          {activities.map((activity) => (
            <Card image={activity.bannerImageUrl} key={activity.id}>
              <MyActibitiyCardInfo data={activity} />
            </Card>
          ))}
        </div>
      ) : (
        <NoCards />
      )}
    </div>
  );
}
