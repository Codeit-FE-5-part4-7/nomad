import getMyActivities from '@/apis/get/getMyActivities';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Calendar2 from './calendar';
import ActivityDropDown from './ActivityDropDown';

interface ActivityType {
  id: number;
  title: string;
  category?: string;
}
function Index() {
  const [activityLists, setActivityLists] = useState<ActivityType[]>([]);
  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    async function getMyAct() {
      try {
        const data = await getMyActivities({ size: undefined });
        const activities = data?.activities.map((activity: ActivityType) => ({
          id: activity.id,
          title: activity.title,
          category: activity.category,
        }));
        if (activities) {
          setActivityLists(activities);
        }
      } catch (err) {
        setError('데이터 로딩 중 에러가 발생했습니다.');
      }
    }
    getMyAct();
  }, []);

  const handleActivitySelected = (selectedItem: ActivityType) => {
    setSelectedActivityId(selectedItem.id);
  };

  const handleStatusChange = () => {
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
  };

  return (
    <div className='flex py-[1.6rem] px-[1.6rem] flex-col'>
      <h1 className='text-[#000] text-[3.2rem] font-[700] mb-[4.2rem]'>예약 현황</h1>
      {error && <p className='text-red-500'>{error}</p>}
      <ActivityDropDown labelText='체험명' items={activityLists} onItemSelected={handleActivitySelected} />
      <div className='container mx-auto p-4'>
        <Calendar2 items={activityLists} selectedActivityId={selectedActivityId} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}

export default Index;
