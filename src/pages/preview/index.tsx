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

  const colors = [
    { name: 'Black', code: 'var(--color-black)' },
    { name: 'Nomad Black', code: 'var(--color-nomad-black)' },
    { name: 'Gray 500', code: 'var(--color-gray-500)' },
    { name: 'Gray 400', code: 'var(--color-gray-400)' },
    { name: 'Gray 300', code: 'var(--color-gray-300)' },
    { name: 'Gray 200', code: 'var(--color-gray-200)' },
    { name: 'Gray 100', code: 'var(--color-gray-100)' },
    { name: 'Gray 50', code: 'var(--color-gray-50)' },
    { name: 'Gray 25', code: 'var(--color-gray-25)' },
    { name: 'Gray 10', code: 'var(--color-gray-10)' },
    { name: 'Green', code: 'var(--color-green)' },
    { name: 'Green Dark', code: 'var(--color-green-dark)' },
    { name: 'Green Light', code: 'var(--color-green-light)' },
    { name: 'Red', code: 'var(--color-red)' },
    { name: 'Orange', code: 'var(--color-orange)' },
    { name: 'Orange Light', code: 'var(--color-orange-light)' },
    { name: 'Yellow', code: 'var(--color-yellow)' },
    { name: 'Blue', code: 'var(--color-blue)' },
    { name: 'Blue Light', code: 'var(--color-blue-light)' },
    { name: 'Blue Lighter', code: 'var(--color-blue-lighter)' },
  ];

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
      <div className='container mx-auto p-[1.6rem]'>
        <h1 className='text-[2.4rem] font-bold mb-[1.6rem]'>미디어 쿼리 확인</h1>
        <div className='bg-gray-500 sm:bg-blue md:bg-green lg:bg-orange xl:bg-red p-[1.6rem] rounded-[0.8rem]'>
          <p className='text-[1.6rem] text-white font-bold'>브라우저 창 크기를 조정하면 배경 색상이 변경됩니다.</p>
        </div>
      </div>
      <div className='container mx-auto mb-[1.6rem] p-[1.6rem]'>
        <h1 className='text-[2.4rem] font-bold mb-[1.6rem]'>색상 코드 확인</h1>
        <div className='grid grid-cols-3 gap-[1.6rem]'>
          {colors.map((color) => (
            <div key={color.name} className='flex flex-col items-center justify-center p-[1.6rem] rounded-[0.8rem]' style={{ backgroundColor: color.code }}>
              <div className='text-white text-[1.6rem] font-bold'>{color.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Index;
