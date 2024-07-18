// 숫자를 통화 형식으로 포맷하는 커스텀 훅
// import { useEffect, useState } from 'react';

// export function useFormattedCurrency(number: number): string {
//   const [formattedCurrency, setFormattedCurrency] = useState<string>('');

//   useEffect(() => {
//     const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(number);
//     setFormattedCurrency(formatted);
//   }, [number]);

//   return formattedCurrency;
// }
