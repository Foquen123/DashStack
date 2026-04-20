import styles from './StatCard.module.css';
import type { StatCardProps } from './StatCard.props';
import Icon1 from '@/assets/Icon-1.svg';
import Icon2 from '@/assets/Icon-2.svg';
import Icon3 from '@/assets/Icon-3.svg';
import Icon4 from '@/assets/Icon-4.svg';


const icons = [
  Icon1,
  Icon2,
  Icon3,
  Icon4,
];


function StatCard({ title, direction, icon, infoText, percent, value }: StatCardProps) {
  return (
    <div className={styles['card']}>
      <div className={styles['card-row']}>
        <div className={styles['card-main-data']}>
          <div className={styles['card-title']}>{title}</div>
          <div className={styles['card-number']}>{value}</div>
        </div>
        <img src={icons[icon]} alt="" />
      </div>
      <div className={styles['card-info']}>
        {direction === 'up' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" fill="#00B69B" />
        </svg>}
        {direction === 'down' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z" fill="#F93C65" />
        </svg>}
        <div className={styles['card-info-text']}><span className={direction === 'up' ? styles['percent--up'] : styles['percent--down']}>{percent}%</span> {infoText}</div>
      </div>
    </div>
  );
}

export default StatCard;