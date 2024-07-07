import React, { useState } from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { ICON } from '@/constant';
import Image from 'next/image';
/* eslint-disable */
const { star } = ICON;

interface StarProps {
  selected: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const RATINGS = [1, 2, 3, 4, 5];

/**
 * Star component to display individual star for rating.
 *
 * @param {StarProps} props - Props for the Star component.
 * @param {boolean} props.selected - Whether the star is selected.
 * @param {() => void} props.onClick - Click handler for the star.
 * @param {() => void} props.onMouseOver - Mouse over handler for the star.
 * @param {() => void} props.onMouseOut - Mouse out handler for the star.
 * 
 * @returns {JSX.Element} The rendered Star component.
 */
function Star({ selected = false, onClick, onMouseOut, onMouseOver }: StarProps) {
  const StarAction = selected ? star.active.src : star.default.src;
  return <Image src={StarAction} alt={star.default.alt} layout='fill' onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick} className='cursor-pointer' />;
}

interface RatingInputProps {
  setValue: UseFormSetValue<any>;
  control: Control<any>;
}

/**
 * RatingInput component to display a star rating input.
 * 
 * This component integrates with react-hook-form to manage rating input.
 * It displays a series of stars that users can click to set a rating.
 * 
 * @param {RatingInputProps} props - Props for the RatingInput component.
 * @param {UseFormSetValue<any>} props.setValue - Function to set the value of the rating input in the form.
 * @param {Control<any>} props.control - Control object from react-hook-form to manage form state.
 * 
 * @returns {JSX.Element} The rendered RatingInput component.
 */
export default function RatingInput({ setValue, control }: RatingInputProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (value: number) => {
    setValue('rating', value);
  };

  const handleStarMouseOver = (value: number) => {
    setHoverRating(value);
  };

  const handleStarMouseOut = () => {
    setHoverRating(0);
  };

  return (
    <Controller
      control={control}
      name='rating'
      render={({ field: { onChange, value } }) => (
        <ul className='flex items-start mt-16 mb-8 gap-2 md:mt-4 md:mb-4'>
          {RATINGS.map((rating) => (
            <li key={rating} className='relative w-14 h-14 md:w-10 md:h-10'>
              <Star
                selected={rating <= (hoverRating || value)}
                onClick={() => handleStarClick(rating)}
                onMouseOver={() => handleStarMouseOver(rating)}
                onMouseOut={handleStarMouseOut}
              />
            </li>
          ))}
        </ul>
      )}
    />
  );
}
/* eslint-enable */
