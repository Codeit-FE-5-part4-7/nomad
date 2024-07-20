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

    const title = setInterval(() => {
      if (count < data?.activities.length) {
        setTitle(data?.activities[count++].title);
      }
    }, 3000);

    return () => clearInterval(title);
  }, [data]);

  if (isLoading) return <Skeleton type='search' />;

  return (
    <div className='p-8 box-shadow-md rounded-lg bg-white'>
      <p className='text-2xl font-bold text-[#333236] mb-8 leading-[2.6rem] md:text-[1.6rem] md:mb-4'>무엇을 체험하고 싶으신가요?</p>
      <div className='flex relative'>
        <form onSubmit={handleSubmit} className={`flex items-center w-full gap-3 ${isKeyword ? 'active' : ''}`} onFocus={handleSearchFocus}>
          <input
            className="text-[1.6rem] font-normal text-black relative w-full p-4 pr-12 border border-gray-500 rounded-md leading-[2.6rem] bg-white bg-no-repeat bg-[url('/icons/Icon_bed.svg')] bg-left-3.5 bg-[center] focus:outline-none md:text-[1.4rem] md:bg-[url('/icons/Icon_bed.svg')] md:bg-left-3.5"
            type='search'
            onChange={handleValueChange}
            value={keyword}
            style={{
              backgroundPosition: '1.2rem 1.6rem',
            }}
          />
          <div className='h-14 md:w-24 md:h-12'>
            <LandingPageButton type='submit' size='md' text='검색하기' />
          </div>
        </form>
        <div className='absolute left-44 top-1/2 transform -translate-y-1/2 md:hidden'>
          <ul>{!keyword && !isFocus && <li className='text-[1.6rem] font-normal text-gray-400 h-[2.5rem] overflow-hidden'>{title}</li>}</ul>
        </div>
      </div>
    </div>
  );
}
/* eslint-enable */
