import Button from '@/components/Button';
import { Input } from '@/components/Input';
import SideNavigation from '@/components/SideNavigation';
import { USER_INPUT_VALIDATION } from '@/constant';
import { FormValues } from '@/utils/auth/types';
import { useForm } from 'react-hook-form';

const { email, nickname, password } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
    },
  },
  nicknameRules: {
    required: nickname.errorMessage.empty,
    pattern: {
      value: nickname.regex,
      message: nickname.errorMessage.invalid,
    },
  },
  passwordRules: {
    required: password.errorMessage.empty,
    pattern: {
      value: password.regex,
      message: password.errorMessage.invalid,
    },
    minLength: {
      value: 8,
      message: password.errorMessage.minLength,
    },
  },
};

function Profile() {
  const { formState, register } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const { errors } = formState;

  return (
    <section className='pt-[7.2rem] pb-[15rem] px-[2rem] max-w-[124rem] mx-auto flex gap-[2.4rem] items-start'>
      <SideNavigation />
      <form className='w-full'>
        <div className='flex justify-between'>
          <h2 className='text-[3.2rem] leading-[3.819rem] font-[700] '>내 정보</h2>
          <Button color='black' text='저장하기' cssName='w-[12rem] py-[1.1rem] text-[1.6rem] font-[700] leading-[2.6rem]' />
        </div>
        <div className='pt-[2.4rem] flex flex-col gap-[3.2rem]'>
          <label htmlFor='nickname' className='flex flex-col gap-[1.6rem]'>
            <span className='text-[2.4rem] font-[700] leading-[2.6rem]  text-[#1b1b1b]'>닉네임</span>
            <Input id='nickname' {...register('nickname', rules.nicknameRules)} name='text' type='text' isError={!!errors.nickname} errorMessage={errors.nickname?.message} maxLength={30} />
          </label>
          <label htmlFor='email' className='flex flex-col gap-[1.6rem]'>
            <span className='text-[2.4rem] font-[700] leading-[2.6rem]  text-[#1b1b1b]'>이메일</span>
            <Input id='email' name='email' value='' type='email' readOnly />
          </label>
          <label htmlFor='password' className='flex flex-col gap-[1.6rem]'>
            <span className='text-[2.4rem] font-[700] leading-[2.6rem]  text-[#1b1b1b]'>비밀번호</span>
            <Input id='password' {...register('password', rules.passwordRules)} name='password' type='password' isError={!!errors.password} errorMessage={errors.password?.message} maxLength={30} />
          </label>
          <label htmlFor='passwordConfirm' className='flex flex-col gap-[1.6rem]'>
            <span className='text-[2.4rem] font-[700] leading-[2.6rem]  text-[#1b1b1b]'>비밀번호 재입력</span>
            <Input id='passwordConfirm' {...register('passwordConfirm', rules.passwordRules)} name='email' type='email' isError={!!errors.email} errorMessage={errors.email?.message} maxLength={30} />
          </label>
        </div>
      </form>
    </section>
  );
}

export default Profile;
