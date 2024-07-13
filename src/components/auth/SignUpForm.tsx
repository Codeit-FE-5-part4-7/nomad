import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { USER_INPUT_VALIDATION } from '@/constant';
import { FormValues } from '@/utils/auth/types';
import FormHeader from './FormHeader';
import { Input } from '../Input';
import SubmitButton from './SubmitButton';
/* eslint-disable */
const { email, nickname, password, passwordConfirm } = USER_INPUT_VALIDATION;

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

interface SignupFormProps {
  onSignupSubmit: SubmitHandler<FormValues>;
}

export default function SignupForm({ onSignupSubmit }: SignupFormProps) {
  const { formState, register, handleSubmit, getValues } = useForm<FormValues>({
    mode: 'onBlur',
  });
  const { errors, isValid } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSignupSubmit({ email: data.email, nickname: data.nickname, password: data.password });
  };

  const submitVariant = isValid ? 'primary' : 'secondary';

  return (
    <div className='mb-[6rem] md:max-w-[64rem] max-w-[35rem] pt-40 mx-auto max-h-screen md:pt-28 sm:max-w-md sm:pt-16 sm:px-3'>
      <fieldset>
        <legend className='hidden'>Global Nomad 회원가입</legend>
        <FormHeader />
        <form className='flex flex-col items-stretch gap-7 w-full mt-10' onSubmit={handleSubmit(onSubmit)}>
          <label className='flex flex-col items-start gap-2'>
            <span className='text-xl font-normal text-black'>이메일</span>
            <Input {...register('email', rules.emailRules)} name='email' type='email' isError={!!errors.email} errorMessage={errors.email?.message} maxLength={30} />
          </label>
          <label className='flex flex-col items-start gap-2'>
            <span className='text-xl font-normal text-black'>닉네임</span>
            <Input {...register('nickname', rules.nicknameRules)} name='nickname' type='text' isError={!!errors.nickname} errorMessage={errors.nickname?.message} maxLength={12} />
          </label>
          <label className='flex flex-col items-start gap-2'>
            <span className='text-xl font-normal text-black'>비밀번호</span>
            <Input {...register('password', rules.passwordRules)} name='password' type='password' isError={!!errors.password} errorMessage={errors.password?.message} maxLength={15} />
          </label>
          <label className='flex flex-col items-start gap-2'>
            <span className='text-xl font-normal text-black'>비밀번호 확인</span>
            <Input
              {...register('passwordConfirm', {
                validate: {
                  notMatch: (value) => {
                    const { password } = getValues();
                    return password === value || passwordConfirm?.errorMessage.confirm;
                  },
                },
              })}
              name='passwordConfirm'
              type='password'
              isError={!!errors.passwordConfirm}
              errorMessage={errors.passwordConfirm?.message}
              maxLength={15}
            />
          </label>
          <SubmitButton size='lg' text='회원가입 하기' type='submit' variant={submitVariant} disabled={!isValid} />
        </form>
        <div className='flex justify-center pt-6'>
          <span className='text-[1.6rem] font-normal text-primary text-[#4b4b4b]'>
            회원이신가요?
            <Link className='text-[#0b3b2d] text-[1.6rem] font-normal text-darkgreen underline pl-[0.5rem]' href='/signin'>
              로그인하기
            </Link>
          </span>
        </div>
      </fieldset>
    </div>
  );
}
/* eslint-enable */
