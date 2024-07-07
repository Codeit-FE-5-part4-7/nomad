// 버튼 디자인 넣어야 함!!!

/* eslint-disable */
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { PostReservationData, GetActivityDetail } from '@/utils/types';
import SmallCalendar from './small-calendar';
import { postformatDate } from '../utils/dateChange';

interface DateFormProps {
  control?: Control<PostReservationData>;
  onClickCloseModal?: () => void;
  className?: string;
  handleSelectSchedule?: (id: number) => void;
  abledShedule?: GetActivityDetail['schedules'];
}

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

/**
 * DateForm component for selecting dates and times for a reservation.
 * 
 * This component displays a calendar for selecting a date and a list of available times for that date.
 * Users can select a time slot and submit the form.
 * 
 * @param {Object} props - The properties for the DateForm component.
 * @param {Control<PostReservationData>} [props.control] - Control object from react-hook-form for managing form state.
 * @param {() => void} [props.onClickCloseModal] - Callback function to close the modal.
 * @param {string} [props.className] - Optional additional class names for styling the component.
 * @param {(id: number) => void} [props.handleSelectSchedule] - Callback function to handle the selection of a schedule.
 * @param {GetActivityDetail['schedules']} [props.abledShedule] - Array of available schedules for the selected date.
 * 
 * @returns {JSX.Element} The rendered DateForm component.
 */
function DateForm({ handleSelectSchedule, control, onClickCloseModal, className, abledShedule }: DateFormProps) {
  const [calenderValue, onChangeCalender] = useState<Value>();
  const [scheduleId, setscheduleId] = useState<number>();
  const abledDate = abledShedule?.map((schedule) => schedule.date);

  const formatDate = postformatDate(calenderValue as Date);

  const handleClickTimes = (id: number) => {
    setscheduleId(id);
    if (handleSelectSchedule) {
      handleSelectSchedule(id);
    }
  };

  const handleChangeValue = (data: Value | string) => {
    onChangeCalender(data as Value);
  };

  return (
    <>
      <h2 className={`text-2xl font-bold text-black leading-10 ${className}`}>날짜</h2>
      <div className={`flex flex-col gap-8 mt-8 max-w-xl ${className}`}>
        <SmallCalendar abledDate={abledDate} value={calenderValue} onChange={handleChangeValue} />
        <div className='w-full'>
          <label htmlFor='abled-time' className='text-lg font-bold text-gray-600 flex items-center'>
            예약 가능한 시간
          </label>
          <ul className='flex flex-wrap gap-3 mt-3'>
            <Controller
              name='scheduleId'
              control={control}
              render={({ field }) => (
                <>
                  {abledShedule?.map((schedule) =>
                    formatDate === schedule.date ? (
                      <li
                        key={schedule.id}
                        value={field.value}
                        className='flex items-center text-base font-medium text-gray-600 gap-4 py-4 px-5 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-600 hover:text-white'
                      >
                        <button
                          type='button'
                          onClick={() => handleClickTimes(schedule.id)}
                          className={`py-2 px-4 rounded ${scheduleId === schedule.id ? 'bg-primary text-white' : 'bg-white text-primary border border-primary'}`}
                        >
                          {`${schedule.startTime}~${schedule.endTime}`}
                        </button>
                      </li>
                    ) : null,
                  )}
                  {abledShedule?.filter((schedule) => formatDate === schedule.date).length === 0 && (
                    <p className='text-sm font-medium text-green-600 mb-4'>해당하는 날짜에 예약 가능한 시간이 없습니다</p>
                  )}
                </>
              )}
            />
          </ul>
        </div>
        {onClickCloseModal && (
          <button type='button' onClick={onClickCloseModal} className='py-2 px-4 bg-primary text-white rounded-lg'>
            작성하기
          </button>
        )}
      </div>
    </>
  );
}

DateForm.propTypes = {
  control: PropTypes.object,
  onClickCloseModal: PropTypes.func,
  className: PropTypes.string,
  handleSelectSchedule: PropTypes.func,
  abledShedule: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    }),
  ),
};

DateForm.defaultProps = {
  control: undefined,
  onClickCloseModal: undefined,
  className: undefined,
  handleSelectSchedule: undefined,
  abledShedule: undefined,
};

export default DateForm;
/* eslint-enable */
