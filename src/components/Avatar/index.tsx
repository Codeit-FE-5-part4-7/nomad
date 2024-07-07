import Image from 'next/image';
import { IMAGE } from '@/constant/importImages';

/**
 * AvatarProps 인터페이스는 Avatar 컴포넌트의 props를 정의합니다.
 */
interface AvatarProps {
  /**
   * 사용자의 프로필 이미지 URL.
   * null일 경우 기본 프로필 이미지가 사용됩니다.
   *
   * @default null
   */
  profileImageUrl?: string | null;

  /**
   * 아바타의 타입을 정의합니다.
   * 'gnb'는 네비게이션 바에 사용되는 작은 아바타를 의미하고,
   * 'comment'는 댓글 섹션에 사용되는 큰 아바타를 의미합니다.
   */
  type: 'gnb' | 'comment';
}

/**
 * Avatar 컴포넌트는 사용자의 프로필 이미지를 표시합니다.
 *
 * @param {AvatarProps} props - 컴포넌트에 전달되는 props
 * @param {string | null} props.profileImageUrl - 사용자의 프로필 이미지 URL. 기본값은 null입니다.
 * @param {'gnb' | 'comment'} props.type - 아바타의 타입을 정의합니다.
 * @returns {JSX.Element} 아바타 컴포넌트
 *
 * @example
 * // 네비게이션 바에서 사용되는 아바타
 * <Avatar type="gnb" profileImageUrl="https://example.com/profile.jpg" />
 *
 * @example
 * // 댓글 섹션에서 사용되는 아바타
 * <Avatar type="comment" profileImageUrl="https://example.com/profile.jpg" />
 */
function Avatar({ profileImageUrl, type }: AvatarProps): JSX.Element {
  const imageUrl = profileImageUrl || IMAGE.avatar.default.src;
  const size = type === 'gnb' ? 'h-8 w-8' : 'h-11 w-11';

  return (
    <div className={`flex justify-center items-center rounded-full overflow-hidden flex-shrink-0 ${size}`}>
      <Image src={imageUrl} alt='프로필 이미지' height={type === 'gnb' ? 32 : 45} width={type === 'gnb' ? 32 : 45} />
    </div>
  );
}

// 기본값 설정
Avatar.defaultProps = {
  profileImageUrl: null,
};

export default Avatar;
