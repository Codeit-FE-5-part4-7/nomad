import instance from '@/apis/axios';
import { GETMyActivities } from '@/utils/types/myActivities';

/* eslint-disable */
interface GMAProps {
  cursorId?: number;
  size?: number;
}
/** cursorId: 무한스크롤 할 때 다음 페이지 찾아오는 용도
 *  size: 몇 개 가져올 것인지 정하는 용도
 */
const getMyActivities = async ({ cursorId, size }: GMAProps) => {
  try {
    const { data } = await instance.get<GETMyActivities>(`/my-activities`, {
      params: { size, cursorId },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getMyActivities;
/* eslint-enable */
