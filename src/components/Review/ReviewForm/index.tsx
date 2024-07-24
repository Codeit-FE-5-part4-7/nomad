import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import postMyReview from '@/apis/post/postMyReview';

import Button from '@/components/Button';
import RatingInput from '../RatingInput';

interface FormData {
  rating: number;
  content: string;
}

interface Props {
  id: number;
  onClickCloseModal: () => void;
}

// 1.리뷰 리스트 리액트쿼리 마이그레이션
// 2.후기 작성하면 더이상 못하게 막아야 됨

export default function ReviewForm({ id, onClickCloseModal }: Props) {
  // const queryClient = useQueryClient();
  const { control, handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: { rating: 0, content: '' },
  });

  const postReviewMutation = useMutation({
    mutationFn: (data: FormData) => postMyReview(id, data),
    onSuccess: () => {
      onClickCloseModal();
      // queryClient.invalidateQueries({ queryKey: ['MyReservations'] });
    },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    postReviewMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-[2.4rem]'>
      <RatingInput control={control} setValue={setValue} />
      <textarea
        {...register('content', { required: '후기를 작성해 주세요' })}
        className='text-[1.6rem] border border-gray-400 w-full min-h-[22.4rem] resize-none p-2 px-4 rounded-md'
        placeholder='후기를 작성해주세요'
      />
      <Button type='submit' color='black' text='작성하기' cssName='py-[1.5rem] text-[1.6rem] leading-[2.6rem] font-[700]' />
    </form>
  );
}
