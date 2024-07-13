import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import Pagination from '@/components/Pagination';
import SideNavigation from '@/components/SideNavigation';
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

  const showAlert = () => {
    alert('로그인 하기');
  };

  // ------------------------------------

  return (
    <>
      <p>버튼 컴포넌트를 수정해서 기존에 있던 CustomButton이 아닌 Button을 사용하시면 됩니다.</p>
      <p className='font-bold'>스타일 예시 cssName=w-[48rem] h-[4rem] </p>
      <Button text='로그인 하기' color='black' onClick={showAlert} />
      <hr />
      <Button text='로그인 하기' color='white' onClick={showAlert} />
      <hr />
      <Button text='신청 불가' color='black' disabled />
      <hr />
      <Pagination currentPage={currentPage} totalPages={12} onPageChange={handlePageChange} />
      <hr />
      <SideNavigation />
      <hr />
      <Button text='alert 모달 열기' color='white' onClick={handleOpenAlertModal} />
      <hr />
      <Button text='confirm 모달 열기' color='white' onClick={handleOpenConfirmModal} />
      <hr />
    </>
  );
}

export default Index;
