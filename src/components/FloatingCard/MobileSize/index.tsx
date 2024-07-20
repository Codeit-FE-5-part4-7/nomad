import React, { useState } from 'react';
import Button from '@/components/Button';
import CustomPopup from '@/components/CustomPopup';
import { Schedule } from '@/types/ActivityDetail';
import useModal from '@/hooks/useModal';

interface MobileCardProps {
  price: number;
  schedules: Schedule[];
}

function MobileCard({ price, schedules }: MobileCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedTimeText, setSelectedTimeText] = useState<string>('날짜 선택하기');
  const { openModal } = useModal();

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (id: number) => {
    setSelectedTime((prev) => (prev === id ? null : id));
  };

  const handleOpenAlertModal = () => {
    openModal({
      modalType: 'alert',
      content: '예약이 완료되었습니다.',
      btnName: ['확인'],
    });
  };

  const handlePopupClose = (newTimeText: string | null) => {
    if (newTimeText !== null) {
      setSelectedTimeText(newTimeText);
    }
    handleClosePopup();
  };

  return (
    <>
      <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full bg-white border border-gray-200 rounded-lg shadow-md flex flex-row items-center justify-between p-4 z-50'>
        <div className='flex flex-col gap-[0.8rem]'>
          <div className='flex flex-row items-center'>
            <p className='text-[2rem] font-bold text-nomad-black'>₩ {price.toLocaleString()} /</p>
            <p className='text-[1.8rem] text-dark-green ml-1'>명</p>
          </div>
          <p className='text-[1.4rem] text-dark-green cursor-pointer underline' onClick={handleOpenPopup}>
            {selectedTimeText}
          </p>
        </div>
        <div className='flex flex-col items-center'>
          <Button text='예약하기' color='black' cssName='w-[10.6rem] h-[4.8rem] text-[1.6rem] font-bold' onClick={handleOpenAlertModal} disabled={!selectedDate || !selectedTime} />
        </div>
      </div>

      {/* 전체 화면을 차지하는 팝업 */}
      {isPopupOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg w-full h-full max-w-[90%] max-h-[90%] p-4 overflow-auto'>
            <CustomPopup
              schedules={schedules}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onClose={() => handlePopupClose(null)}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
              setSelectedTimeText={(text) => handlePopupClose(text)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default MobileCard;
