import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { PostActivityReservParams, PostActivityReserv } from '@/apis/get/getActivityDetail';
import useModal from '@/hooks/useModal';
import { Schedule } from '@/utils/types/schedule';

/* eslint-disable */
const useReservation = (schedules: Schedule[], price: number) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [participants, setParticipants] = useState(1);
  const { openModal } = useModal();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleParticipantsChange = (delta: number) => {
    setParticipants((prev) => Math.max(1, prev + delta));
  };

  const handleTimeChange = (id: number) => {
    setSelectedTime((prev) => (prev === id ? null : id));
  };

  const handleReservation = async () => {
    if (!id) {
      console.error('Activity ID is missing');
      return;
    }

    if (selectedTime === null) {
      console.error('Schedule ID is missing');
      return;
    }

    const reservationData: PostActivityReservParams = {
      headCount: participants,
      scheduleId: selectedTime,
    };

    try {
      await PostActivityReserv(Number(id), reservationData);
      openModal({
        modalType: 'alert',
        content: '예약이 완료되었습니다.',
        btnName: ['확인'],
      });
    } catch (error) {
      console.error('Failed to create reservation:', error);

      let errorMessage = '예약에 실패했습니다. 다시 시도해주세요.';

      if (error instanceof AxiosError) {
        if (error.response && error.response.data && error.response.data.message) {
          const { message } = error.response.data;
          if (message.includes('이미 예약한 일정입니다.')) {
            errorMessage = '이미 예약한 일정입니다. 다른 시간대를 선택해 주세요.';
          } else if (message.includes('확정 예약이 있는 일정은 예약할 수 없습니다.')) {
            errorMessage = '확정 예약이 있는 일정은 예약할 수 없습니다. 다른 시간대를 선택해 주세요.';
          }
        }
      }

      openModal({
        modalType: 'alert',
        content: errorMessage,
        btnName: ['확인'],
      });
    }
  };

  const isButtonDisabled = selectedTime === null || selectedDate === null;
  const totalCost = price * participants;

  return {
    selectedDate,
    selectedTime,
    participants,
    handleDateChange,
    handleParticipantsChange,
    handleTimeChange,
    handleReservation,
    isButtonDisabled,
    totalCost,
  };
};

export default useReservation;

/* eslint-enable */
