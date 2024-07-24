/* eslint-disable */
import React, { useState } from 'react';
import { Controller, Control, UseFormSetValue } from 'react-hook-form';
import { ICON } from '@/constant';
import Image from 'next/image';

const { star } = ICON;

interface StarProps {
  selected: boolean;
  onClick: () => void;
  onMouseOver: () => void;
  onMouseOut: () => void;
}

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, onClick, onMouseOut, onMouseOver }: StarProps) {
  const StarAction = selected ? star.active.src : star.default.src;
  return <Image width={56} height={56} src={StarAction} alt={star.default.alt} onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick} className='cursor-pointer' />;
}

interface RatingInputProps {
  setValue: UseFormSetValue<any>;
  control: Control<any>;
}

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
        <ul className='py-[2.2rem] flex justify-center gap-[0.8rem]'>
          {RATINGS.map((rating) => (
            <li key={rating}>
              <Star selected={rating <= (hoverRating || value)} onClick={() => handleStarClick(rating)} onMouseOver={() => handleStarMouseOver(rating)} onMouseOut={handleStarMouseOut} />
            </li>
          ))}
        </ul>
      )}
    />
  );
}
