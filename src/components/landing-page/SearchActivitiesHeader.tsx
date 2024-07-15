interface SearchActivitiesHeaderProps {
  search?: string;
  searchTotalCount?: number;
}
/* eslint-disable */
export default function SearchActivitiesHeader({ search, searchTotalCount }: SearchActivitiesHeaderProps) {
  return (
    <div className='flex flex-col items-start gap-3'>
      <h2 className='flex justify-between items-center w-full text-3xl font-bold text-[#1b1b1b]'>
        <span className='font-bold'>{search}</span>
        <span className='font-normal'>(으)로 검색한 결과입니다.</span>
      </h2>
      <span className='text-base font-normal text-[#1b1b1b]'>총 {searchTotalCount}개의 결과</span>
    </div>
  );
}
/* eslint-enable */
