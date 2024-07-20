import { getActivities, getPopularActivities, getSearchActivities } from '@/apis/get/getActivities';
import { IMAGE } from '@/constant';
import useResponsiveSize from '@/hooks/useResponsiveSize';
import useCategoryFilterStore from '@/utils/landing-page/useCategoryFilterStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import MainLayout from './MainLayout';
import Pagination from './Pagination';
import Search from './Search';
import Skeleton from './Skeleton';
import ActivitiesList from './ActivitiesList';
import Banner from './Banner';
import CategoryFilter from './CategoryFilter';
import PopularActivities from './PopularActivitiesList';
/* eslint-disable */
export default function MainPage() {
  const [keyword, setKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const currentSize = useResponsiveSize();

  const { mainCategory, setMainCategory, mainFilter, setMainFilter } = useCategoryFilterStore();

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearchResult = () => {
    setMainCategory('');
    setMainFilter('');
    setCurrentPage(1);
    if (keyword) {
      setSearchKeyword(keyword);
      return;
    }
    setSearchKeyword('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [mainCategory, mainFilter]);

  const { data: popularActivitiesData, isSuccess: isGetPopularActivitiesSuccess } = useQuery({
    queryKey: ['popularActivities'],
    queryFn: getPopularActivities,
    retry: false,
  });

  const { data: activitiesData, isSuccess: isGetActivitiesSuccess } = useQuery({
    queryKey: ['activities', { categoryFilter: `${mainCategory}-${mainFilter}`, page: currentPage, size: currentSize }],
    queryFn: () => getActivities({ currentPage, currentSize, category: mainCategory, filter: mainFilter }),
    retry: false,
    placeholderData: keepPreviousData,
  });

  const { data: searchResultData, isSuccess: isGetSearchResultDataSuccess } = useQuery({
    queryKey: ['activities', { keyword: searchKeyword, page: currentPage, size: currentSize }],
    queryFn: () => getSearchActivities({ currentPage, currentSize, keyword: searchKeyword }),
    retry: false,
    enabled: !!searchKeyword,
  });

  if (!isGetPopularActivitiesSuccess || !isGetActivitiesSuccess)
    return (
      <MainLayout>
        <Banner />
        <div className='relative bottom-[4rem]'>
          <Search keyword={keyword} onSubmit={onSearchResult} onChange={handleValueChange} />
        </div>
        <div className='flex flex-col items-center gap-[4rem]'>
          <Skeleton type='title' />
          <Skeleton type='popular' />
          <CategoryFilter />
          <Skeleton type='all' />
        </div>
      </MainLayout>
    );

  return (
    <MainLayout>
      <Banner />
      <div className='relative bottom-[6rem]'>
        <Search keyword={keyword} onSubmit={onSearchResult} onChange={handleValueChange} />
      </div>
      {searchKeyword ? (
        <>
          {isGetSearchResultDataSuccess && searchResultData.totalCount > 0 ? (
            <>
              <div className='flex flex-col items-center gap-[4rem]'>
                <ActivitiesList activities={searchResultData.activities} search={searchKeyword} searchTotalCount={searchResultData.totalCount} />
              </div>
              <div className='mt-[7rem]'>
                <Pagination data={searchResultData} currentPage={currentPage} setCurrentPage={setCurrentPage} PAGE_LIMIT={currentSize} />
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center mt-[10rem] gap-[2rem]'>
              <Image src={IMAGE.noData.default.src} alt={IMAGE.noData.default.alt} height={177} width={130} />
              <span className='text-2xl font-medium text-gray-700'>검색 결과가 없습니다.</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className='flex flex-col items-center gap-[4rem]'>
            <PopularActivities popularActivities={popularActivitiesData.activities} />
            <CategoryFilter />
            <ActivitiesList category={mainCategory} activities={activitiesData?.activities} />
          </div>
          <div className='mt-[7rem]'>
            <Pagination data={activitiesData} currentPage={currentPage} setCurrentPage={setCurrentPage} PAGE_LIMIT={currentSize} />
          </div>
        </>
      )}
    </MainLayout>
  );
}
/* eslint-enable */
