import { ChangeEventHandler } from 'react';
import styles from './index.module.css';

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  cssName?: string;
  id?: string;
}

export default function TimeInput({ cssName = '', onChange, value, id }: InputProps) {
  return (
    <div className={`${cssName} overflow-hidden bg-white text-black w-full px-4 rounded-[0.6rem] border border-gray-400 transition text-[1.6rem] h-[4.4rem]`}>
      <div className='relative w-full h-full'>
        <input type='text' tabIndex={-1} className='absolute top-0 bottom-0 left-0 right-0' readOnly value={value} placeholder='00:00' />
        <input type='time' id={id} className={`${styles.customTime} ${styles.delTime} absolute top-0 bottom-0 left-0 right-0 text-transparent bg-transparent`} onChange={onChange} />
      </div>
    </div>
  );
}
