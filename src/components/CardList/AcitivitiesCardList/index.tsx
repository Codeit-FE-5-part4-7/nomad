// 실제 데이터로 시험해보지는 않아서 버그있을 수 있음
import { Activity } from '@/utils/types/myActivities';
import Card from '../../Card';
import MyActibitiyCardInfo from '../../Card/myActibityCardInfo';
import NoCards from '../NoCards';

/** 카드리스트 컴포넌트 : 카드를 나열하는 컴포넌트 */
export default function AcitivitiesCardList({ activities, delActivity }: { activities: Activity[]; delActivity: (activityId: number) => void }) {
  return (
    <div>
      {activities.length ? (
        <div className='flex flex-col gap-y-[2.4rem] max-md:gap-y-[1.6rem]'>
          {activities.map((activity) => (
            <Card image={activity.bannerImageUrl} key={activity.id}>
              <MyActibitiyCardInfo data={activity} delActivity={delActivity} />
            </Card>
          ))}
        </div>
      ) : (
        <NoCards />
      )}
    </div>
  );
}
