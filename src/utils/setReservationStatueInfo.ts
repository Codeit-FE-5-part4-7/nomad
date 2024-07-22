export default function setReservationStatueInfo(status: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed') {
  switch (status) {
    case 'pending':
      return {
        name: '예약 완료',
        btnColor: 'text-[#2EB4FF]',
      };
    case 'canceled':
      return {
        name: '예약 취소',
        btnColor: 'text-[#79747E]',
      };
    case 'confirmed':
      return {
        name: '예약 승인',
        btnColor: 'text-[#79747E]',
      };
    case 'declined':
      return {
        name: '예약 거절',
        btnColor: 'text-[#FF472E]',
      };
    case 'completed':
      return {
        name: '체험 완료',
        btnColor: 'text-[#79747E]',
      };
    default:
      return {
        name: '',
        btnColor: '',
      };
  }
}
