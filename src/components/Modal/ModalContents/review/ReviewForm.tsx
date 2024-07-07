import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import postMyReview from '@/apis/post/postMyReview';
import RatingInput from './RatingInput';

/**
 * FormData interface
 * @property {number} rating - The rating given by the user.
 * @property {string} content - The content of the review.
 */
interface FormData {
  rating: number;
  content: string;
}

/**
 * Props interface
 * @property {number} id - The ID of the reservation being reviewed.
 * @property {() => void} onClickCloseModal - Function to close the modal.
 */
interface Props {
  id: number;
  onClickCloseModal: () => void;
}

/**
 * ReviewForm Component
 *
 * This component renders a form for submitting a review. It includes a rating input and a textarea
 * for the review content. Upon submission, the review data is posted using a mutation function.
 *
 * @param {Props} props - The properties for the component.
 * @param {number} props.id - The ID of the reservation being reviewed.
 * @param {() => void} props.onClickCloseModal - Function to close the modal.
 *
 * @returns {JSX.Element} The rendered ReviewForm component.
 */
export default function ReviewForm({ id, onClickCloseModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setValue, register } = useForm<FormData>({
    defaultValues: { rating: 0, content: '' },
  });

  const postReviewMutation = useMutation({
    mutationFn: (data: FormData) => postMyReview(id, data),
    onSuccess: () => {
      onClickCloseModal();
      queryClient.invalidateQueries({ queryKey: ['MyReservations'] });
    },
  });

  const submit: SubmitHandler<FormData> = (data) => {
    postReviewMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-6 mt-7'>
      <RatingInput control={control} setValue={setValue} />
      <textarea
        {...register('content', { required: '후기를 작성해 주세요' })}
        className='text-[1.6rem] border border-gray-400 w-full min-h-[22.4rem] resize-none p-2 px-4 rounded-md'
        placeholder='후기를 작성해주세요'
      />
      <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md'>
        작성하기
      </button>
    </form>
  );
}
