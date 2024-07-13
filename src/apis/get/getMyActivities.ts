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
// 린트 때문에 디폴트로 한 것이지 나중에 추가되면 디폴트 제거할 예정
/* eslint-enable */
