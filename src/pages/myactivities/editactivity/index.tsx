import Button from '@/components/Button';
import MyLayout from '@/components/MyLayout';

export default function EditActivitiy() {
  return (
    <MyLayout>
      <main className='bg-[#fafafa]'>
        <div className='flex justify-between mb-[2.4rem] '>
          <h2 className='text-[3.2rem] text-[#000] leading-[3.8rem] font-bold'>내 체험 수정</h2>
          <Button color='black' cssName='w-[12rem] h-[4.8rem] text-[1.6rem] leading-[2.6rem] rounded-[0.4rem] border-none' text='수정하기' />
        </div>
      </main>
    </MyLayout>
  );
}
