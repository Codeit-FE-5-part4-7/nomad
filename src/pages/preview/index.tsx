import React, { useState } from 'react';
import CustomButton from '@/components/Button/CustomButton';
import GrayButton from '@/components/Button/GrayButton';
import Card from '@/components/Card';
import MyActibitiyCardInfo from '@/components/Card/myActibityCardInfo';
import Pagination from '@/components/Pagination';

function Index() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <CustomButton text='로그인 하기' color='black' onClick={() => alert('로그인 하기')} />
      <hr />
      <CustomButton text='로그인 하기' color='white' onClick={() => alert('로그인 하기')} />
      <hr />
      <GrayButton text='신청 불가' onClick={() => alert('신청 불가')} />
      <hr />
      <Card image='/images/test123.png'>
        <MyActibitiyCardInfo title='테스트' price={10000} rating={4.31} reviewCount={2039} />
      </Card>
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
    </>
  );
}

export default Index;
