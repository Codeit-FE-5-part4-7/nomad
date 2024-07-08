import React, { useState } from 'react';
import CustomButton from '@/components/Button';
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
      <CustomButton text='로그인 하기' color='black' />
      <hr />
      <CustomButton text='로그인 하기' color='white' />
      <hr />
      <CustomButton text='신청 불가' color='black' disabled />
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
