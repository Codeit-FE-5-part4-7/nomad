import { SubmitHandler, useForm } from 'react-hook-form';
import { USER_INPUT_VALIDATION } from '@/constant';
import { FormValues } from '@/utils/auth/types';
import Link from 'next/link';
import SubmitButton from './SubmitButton';
import { Input } from '../Input';
import FormHeader from './FormHeader';
/* eslint-disable */
const { email, password } = USER_INPUT_VALIDATION;

const rules = {
  emailRules: {
    required: email.errorMessage.empty,
    pattern: {
      value: email.regex,
      message: email.errorMessage.invalid,
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

interface LoginFormProps {
  onSigninSubmit: SubmitHandler<FormValues>;
}

export default function LoginForm({ onSigninSubmit: handleSigninSubmit }: LoginFormProps) {
  const { formState, register, handleSubmit } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const { errors, isValid } = formState;
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSigninSubmit({ email: data.email, password: data.password });
  };
  const submitVariant = isValid ? 'primary' : 'secondary';

  return (
    <div className='mb-16 md:max-w-[64rem] max-w-[35rem] lg:pt-[10.4rem] mx-auto max-h-screen md:pt-[7.2rem]  sm:px-[1.2rem] pt-[4.4rem]'>
      <fieldset>
        <legend className='sr-only'>Global Nomad 로그인</legend>
        <FormHeader />
        <form className='flex flex-col items-stretch gap-[2.8rem] w-full mt-[4rem]' onSubmit={handleSubmit(onSubmit)}>
          <label className='flex flex-col items-start gap-[0.8rem]'>
            <span className='text-[1.6rem] font-normal text-black'>이메일</span>
            <Input {...register('email', rules.emailRules)} name='email' type='email' isError={!!errors.email} errorMessage={errors.email?.message} maxLength={30} />
          </label>
          <label className='flex flex-col items-start gap-[0.8rem]'>
            <span className='text-[1.6rem] font-normal text-black'>비밀번호</span>
            <Input {...register('password', rules.passwordRules)} name='password' type='password' isError={!!errors.password} errorMessage={errors.password?.message} maxLength={15} />
          </label>
          <SubmitButton size='lg' text='로그인 하기' type='submit' variant={submitVariant} disabled={!isValid} />
        </form>
        <div className='flex justify-center pt-[2.3rem]'>
          <span className='text-[1.6rem] font-normal text-primary text-[#4b4b4b]'>
            회원이 아니신가요?
            <Link className='text-[#0b3b2d] text-[1.6rem] font-normal text-darkgreen underline pl-[0.5rem]' href='/signup'>
              회원가입하기
            </Link>
          </span>
        </div>
      </fieldset>
    </div>
  );
}
/* eslint-enable */
