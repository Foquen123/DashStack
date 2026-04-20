import { DayPicker, defaultLocale } from 'react-day-picker';
import { addMonths, format, subMonths, type Day } from 'date-fns';
import styles from './Calender.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useDatesFromUrl from '../../../../hooks/useDatesFromUrl';
import DropdownWrapper from '../DropdownWrapper/DropdownWrapper';

function Calender({ onClose }: { onClose?: () => void }) {
  const dates = useDatesFromUrl();
  const [selectedDays, setSelectedDays] = useState<Date[]>(dates);
  const [month, setMonth] = useState<Date>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const formattedMonth = format(month, 'LLLL yyyy');

  useEffect(() => {
    function updateSelected() {
      
      setSelectedDays(dates);
    }
    updateSelected();
  }, [searchParams]);

  const locale = {
    ...defaultLocale,
    localize: {
      ...defaultLocale.localize,
      // Example: shorten weekday names
      day: (n: Day,
        opts?: { width?: 'wide' | 'abbreviated' | 'short' | 'narrow' | 'any' }) => {
        const d = defaultLocale.localize.day(n, { ...opts, width: 'any' });
        return d.charAt(0);
      }
    },
  };

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('date');
    selectedDays.forEach(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      newParams.append('date', formattedDate);
    });

    setSearchParams(newParams);
    onClose?.();
  };

  const handleSelect = (days: Date[] | undefined) => {
    setSelectedDays(days || []);
  };

  return (
    <DropdownWrapper onApplyFilters={handleApplyFilters} text='*You can choose multiple date'>
      <div className={styles['header']}>
        {formattedMonth}
        <div className={styles['buttons-container']}>
          <button onClick={() => setMonth(m => subMonths(m, 1))} className={styles['control-button']}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.683896" fillRule="evenodd" clipRule="evenodd" d="M7.55646 1.44801L2.79872 5.88467L7.23538 10.6424L5.78738 11.9927L0.000428096 5.78695L6.20617 3.03326e-07L7.55646 1.44801Z" fill="#121212" />
            </svg>
          </button>
          <button onClick={() => setMonth(m => addMonths(m, 1))} className={styles['control-button']}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.683896" fillRule="evenodd" clipRule="evenodd" d="M0.000182521 1.44801L4.75792 5.88467L0.321258 10.6424L1.76926 11.9927L7.55621 5.78695L1.35047 3.03326e-07L0.000182521 1.44801Z" fill="#121212" />
            </svg>
          </button>
        </div>
      </div>
      <DayPicker
        month={month}
        mode="multiple"
        selected={selectedDays}
        onSelect={handleSelect}
        showOutsideDays
        locale={locale}
        classNames={{
          // ...classNames,
          root: styles['rdp-root'],
          selected: styles['rdp-selected'],
          month_caption: styles['rdp-month_caption'],
          nav: styles['rdp-nav'],
          day: styles['rdp-day'],
          day_button: styles['rdp-day_btn'],
          weekdays: styles['rdp-weekdays'],
          month_grid: styles['rdp-grid'],
          weekday: styles['rdp-weekday'],
          weeks: styles['rdp-weeks']
        }}
      />
    </DropdownWrapper>
  );
}

export default Calender;