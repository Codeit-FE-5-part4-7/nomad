import instance from '@/apis/axios';
import { ICON, IMAGE } from '@/constant/importImages';
import useToggleButton from '@/hooks/useToggleButton';
import useOutsideClick from '@/hooks/useOutsideClick';
import { MyInfoProps } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import DropdownMenu from '@/components/DropdownMenu';
import Avatar from '../../Avatar';
// import Modal from '../Modals';

/**
 * Header 컴포넌트는 네비게이션 바를 렌더링합니다.
 * 사용자 인증 상태에 따라 로그인/회원가입 링크 또는 사용자 정보와 드롭다운 메뉴를 표시합니다.
 *
 * @returns {JSX.Element | null} 네비게이션 바 컴포넌트
 */
export default function Header(): JSX.Element | null {
  const router = useRouter();
  const [Auth, setAuth] = useState(false);
  const { isToggle: isDropdownOpen, handleToggleClick: isDropdownOpenToggle } = useToggleButton();
  const { isToggle: isNotificationOpen, handleToggleClick: isNotificationOpenToggle } = useToggleButton();
  const ref = useRef<HTMLButtonElement>(null);

  useOutsideClick(ref, isDropdownOpen, isDropdownOpenToggle);

  /**
   * 현재 사용자의 정보를 가져오는 함수입니다.
   * @returns {Promise<MyInfoProps>} 사용자 정보 데이터
   */
  const getMyInfo = async () => {
    const { data } = await instance.get<MyInfoProps>('/users/me');
    return data;
  };

  const { data: MyInfoData, isPending } = useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    retry: 1,
  });

  /**
   * 로그아웃 핸들러 함수입니다. 사용자의 토큰을 삭제하고 로그인 페이지로 리디렉션합니다.
   */
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (!localStorage.getItem('accessToken')) {
      isDropdownOpenToggle();
      router.push('/signin');
    }
  };

  /**
   * 마이페이지 클릭 핸들러 함수입니다. 드롭다운 메뉴를 닫고 마이페이지로 리디렉션합니다.
   */
  const handleMyPageClick = () => {
    isDropdownOpenToggle();
    router.push('/mypage');
  };

  const MyMenuList = [
    {
      text: '내 정보',
      handleClick: handleMyPageClick,
    },
    {
      text: '로그아웃',
      handleClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      setAuth(true);
      return;
    }
    setAuth(false);
  }, []);

  if (isPending) {
    return null;
  }

  return (
    <div className='flex justify-around items-center sticky top-0 w-full h-28 bg-white border-b border-gray-300 z-50'>
      <div className='flex justify-between items-center max-w-screen-xl w-full mx-auto px-6'>
        <Link href='/'>
          <Image src={IMAGE.logo.nav.src} alt={IMAGE.logo.nav.alt} height={28} width={166} />
        </Link>
        <div>
          {!Auth ? (
            <div className='flex gap-10'>
              <Link href='/signin' className='flex items-center text-lg font-medium text-black'>
                로그인
              </Link>
              <Link href='/signup' className='flex items-center text-lg font-medium text-black'>
                회원가입
              </Link>
            </div>
          ) : (
            <div className='relative flex items-center gap-10'>
              <button type='button' className='flex items-center' onClick={isNotificationOpenToggle}>
                <Image src={ICON.notification.default.src} alt={ICON.notification.default.alt} />
              </button>
              {/* {isNotificationOpen && (
                <Modal
                  className="absolute top-24 left-0 lg:left-[-225px] w-96"
                  modalType='notifications'
                  setShowModal={isNotificationOpenToggle}
                />
              )} */}
              {isNotificationOpen && <div />}
              <div className='relative flex items-center gap-10'>
                <div className='h-9 border-r border-gray-300' />
                <div className='flex items-center gap-4'>
                  <Avatar profileImageUrl={MyInfoData?.profileImageUrl} type='gnb' />
                  <button type='button' className='flex items-center text-lg font-medium text-black' onClick={isDropdownOpenToggle} ref={ref}>
                    {MyInfoData?.nickname}
                  </button>
                  {isDropdownOpen && <DropdownMenu type='gnb' dropdownMenuList={MyMenuList} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
