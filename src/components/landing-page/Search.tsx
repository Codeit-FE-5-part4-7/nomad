import { ChangeEvent, FormEvent, useState, useRef, useEffect } from 'react';
import instance from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';
import LandingPageButton from './CustomButton';
import Skeleton from './Skeleton';
/* eslint-disable */
interface Props {
  onSubmit: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

export default function Search({ keyword, onSubmit, onChange }: Props) {
  const [isKeyword, setIsKeyword] = useState(false);
  const [title, setTitle] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function getActivity() {
    const res = await instance.get('/activities', {
      params: {
        method: 'offset',
      },
    });
    return res.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ['/activities'],
    queryFn: getActivity,
  });

  const handleSearchFocus = () => {
    setIsFocus(true);
    setIsKeyword(true);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);

    if (e.target.value === '') {
      setIsKeyword(false);
    } else {
      setIsKeyword(true);
      setIsFocus(false);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(e);
    }, 300);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  let count = 1;
  useEffect(() => {
    if (data) {
      setTitle(data?.activities[0].title);
    }

    const titleInterval = setInterval(() => {
      if (count < data?.activities.length) {
        setTitle(data?.activities[count++].title);
      }
    }, 3000);

    return () => clearInterval(titleInterval);
  }, [data]);

  if (isLoading) return <Skeleton type='search' />;

  return (
    <div className='p-8 md:p-6 shadow-lg rounded-lg bg-white'>
      <p className='text-2xl font-bold text-[#333236] mb-8 md:text-lg md:mb-6 leading-10'>무엇을 체험하고 싶으신가요?</p>
      <div className='flex flex-col relative'>
        <form onSubmit={handleSubmit} className={`flex items-center justify-center w-full gap-3 relative ${isKeyword ? 'active' : ''}`} onFocus={handleSearchFocus}>
          <input
            className="text-lg font-normal text-[#1b1b1b] w-full p-6 pl-[4.8rem] border border-[#79747e] rounded-md bg-white bg-no-repeat bg-[url('/icons/Icon_bed.svg')] bg-[1.2rem_1.6rem] md:text-base md:bg-[url('/icons/Icon_bed.svg')] md:bg-[1.2rem_1.2rem]"
            type='search'
            onChange={handleValueChange}
            value={keyword}
            style={{ backgroundImage: "url('/icons/Icon_bed.svg')" }}
          />
          <div className='flex items-center justify-center w-[13.6rem]'>
            <LandingPageButton type='submit' size='md' text='검색하기' />
          </div>
          {isKeyword && (
            <span className='text-lg font-normal text-[#a4a1aa] absolute left-14 bg-white px-2 transform -translate-y-8 transition-transform duration-300 md:text-base md:transform-none md:top-[-1rem]'>
              내가 원하는 체험은
            </span>
          )}
        </form>
        {!isKeyword && !isFocus && (
          <div className='absolute left-[17.5rem] top-1/2 transform -translate-y-1/2 h-10 overflow-hidden md:hidden'>
            <ul>
              <li className='text-lg font-normal text-[#adaeb8] leading-10'>{title}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
/* eslint-enable */
