import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import Pagination from '@/components/Pagination';
import SideNavigation from '@/components/SideNavigation';
import Button from '@/components/Button';
import { filterCategories } from '@/constant/filterCategoryOptions';
import CategoryButton from '@/components/FilterButton/CategoryButton';
import { Input } from '@/components/Input';
import Dropdown from '@/components/Dropdown';

/* eslint-disable */
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

  // Example FilterButton ------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // --------------------------------------

  const colors = [
    { name: 'Black', code: 'var(--color-black)', hex: '#1b1b1b' },
    { name: 'Nomad Black', code: 'var(--color-nomad-black)', hex: '#112211' },
    { name: 'Gray 500', code: 'var(--color-gray-500)', hex: '#4b4b4b' },
    { name: 'Gray 400', code: 'var(--color-gray-400)', hex: '#79747e' },
    { name: 'Gray 300', code: 'var(--color-gray-300)', hex: '#a4a1aa' },
    { name: 'Gray 200', code: 'var(--color-gray-200)', hex: '#adaeb8' },
    { name: 'Gray 100', code: 'var(--color-gray-100)', hex: '#cbc9cf' },
    { name: 'Gray 50', code: 'var(--color-gray-50)', hex: '#dddddd' },
    { name: 'Gray 25', code: 'var(--color-gray-25)', hex: '#eeeeee' },
    { name: 'Gray 10', code: 'var(--color-gray-10)', hex: '#fafafa' },
    { name: 'Green', code: 'var(--color-green)', hex: '#00ac07' },
    { name: 'Green Dark', code: 'var(--color-green-dark)', hex: '#0b3b2d' },
    { name: 'Green Light', code: 'var(--color-green-light)', hex: '#ced8d5' },
    { name: 'Red', code: 'var(--color-red)', hex: '#ff472e' },
    { name: 'Red Light', code: 'var(--color-red-light)', hex: '#ffe4e0' },
    { name: 'Orange', code: 'var(--color-orange)', hex: '#ff7c1d' },
    { name: 'Orange Light', code: 'var(--color-orange-light)', hex: '#fff4e8' },
    { name: 'Yellow', code: 'var(--color-yellow)', hex: '#ffc23d' },
    { name: 'Blue', code: 'var(--color-blue)', hex: '#0085ff' },
    { name: 'Blue Light', code: 'var(--color-blue-light)', hex: '#2eb4ff' },
    { name: 'Blue Lighter', code: 'var(--color-blue-lighter)', hex: '#e5f3ff' },
  ];

  // Dropdown --------------------------------------------------
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const handleSelectedId = (id: number) => {
    setSelectedCategoryId(id);
  };

  const dropdownLists = [
    { id: 1, category: 'Category 1', title: 'Option 1' },
    { id: 2, category: 'Category 2', title: 'Option 2' },
    { id: 3, category: 'Category 3', title: 'Option 3' },
  ];
  //----------------------------------------------------------------

  // ReservationInfo -----------------------------------------------

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  //----------------------------------------------------------------

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
      {filterCategories.map((category) => (
        <CategoryButton key={category} text={category} isSelected={selectedCategory === category} onClick={() => setSelectedCategory(category)} />
      ))}

      <br />
      <Input type='email' />
      <hr />
      <div className='container mx-auto p-[1.6rem]'>
        <h1 className='text-[2.4rem] font-bold mb-[1.6rem]'>미디어 쿼리 확인</h1>
        <div className='bg-gray-500 sm:bg-blue md:bg-green lg:bg-orange xl:bg-red p-[1.6rem] rounded-[0.8rem]'>
          <p className='text-[1.6rem] text-white font-bold'>브라우저 창 크기를 조정하면 배경 색상이 변경됩니다.</p>
        </div>
      </div>
      <hr />
      <div className='container mx-auto mb-[1.6rem] p-[1.6rem]'>
        <h1 className='text-[2.4rem] font-bold mb-[1.6rem]'>색상 코드 확인</h1>
        <div className='grid grid-cols-3 gap-[1.6rem]'>
          {colors.map((color) => (
            <div key={color.name} className='flex flex-col items-center justify-center p-[1.6rem] rounded-[0.8rem]' style={{ backgroundColor: color.code }}>
              <div className='text-white text-[1.6rem] font-bold'>{color.name}</div>
              <div className='text-white text-[1.2rem]'>{color.hex}</div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4 text-black'>Dropdown Example</h1>
        <Dropdown name='exampleDropdown' lists={dropdownLists} onSelectedId={handleSelectedId} selectedCategoryId={selectedCategoryId} />
        {selectedCategoryId && <p className='mt-4'>Selected Category ID: {selectedCategoryId}</p>}
      </div>
      <hr />
      <div className='app-container'>
        <h1>My Reservations</h1>
        <Button text='ReservationInfo 열기' color='white' onClick={handleModalOpen} />
        {isModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
/* eslint-enable */
