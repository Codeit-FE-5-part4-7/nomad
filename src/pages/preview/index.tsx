import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import Card from '@/components/Card';
import MyActibitiyCardInfo from '@/components/Card/myActibityCardInfo';
import AcitivitiesCardList from '@/components/CardList/AcitivitiesCardList';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';

export const getStaticProps = async () => ({
  props: {
    layoutType: 'removeLayout',
  },
});

function Index() {
  const { openModal, closeModal } = useModal();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Example Modal ------------------------
  const handleOpenAlertModal = () => {
    openModal({
      modalType: 'alert',
      content: 'Alert 모달입니다.',
      btnName: ['확인'],
    });
  };

  const handleOpenConfirmModal = () => {
    openModal({
      modalType: 'confirm',
      content: 'Confirm 모달입니다.',
      btnName: ['아니오', '취소하기'],
      callBackFnc: () => {
        alert('콜백 함수 실행');
        closeModal();
      },
    });
  };
  // ------------------------------------

  return (
    <>
      <Button text='로그인 하기' color='black' />
      <hr />
      <Button text='로그인 하기' color='white' />
      <hr />
      <Button text='신청 불가' color='black' disabled />
      <hr />
      <Card image='/images/test123.png'>
        <MyActibitiyCardInfo data={{ title: '테스트', price: 10000, rating: 4.31, reviewCount: 2039 }} />
      </Card>
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
      <Button text='alert 모달 열기' color='white' onClick={handleOpenAlertModal} />
      <hr />
      <Button text='confirm 모달 열기' color='white' onClick={handleOpenConfirmModal} />
      <hr />
      <AcitivitiesCardList activities={[]} />
    </>
  );
}

export default Index;
