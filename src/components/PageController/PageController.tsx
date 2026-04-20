import { useSearchParams } from 'react-router';
import styles from './PageController.module.css';
import type { PageControllerProps } from './PageController.props';
import { useEffect } from 'react';
import useDatesFromUrl from '../../hooks/useDatesFromUrl';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';

function PageController({ count, limit, variant = 'standard' }: PageControllerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const dates = useDatesFromUrl();
  const { t } = useTranslation();
  const increatePage = () => {
    if (count === 0) return;
    const maxPage = Math.ceil(count / limit);
    const newPage = Math.min(currentPage + 1, maxPage);

    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };
  const decreasePage = () => {
    const newPage = Math.max(currentPage - 1, 1);
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };

  const increaseDate = () => {
    const newDate = new Date(dates[0]);
    newDate.setDate(dates[0].getDate() + 1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('date', format(newDate, 'yyyy-MM-dd'));
      return newParams;
    });
  };
  const decreaseDate = () => {
    const newDate = new Date(dates[0]);
    newDate.setDate(dates[0].getDate() - 1);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('date', format(newDate, 'yyyy-MM-dd'));
      return newParams;
    });
  };

  useEffect(() => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', '1');
      return newParams;
    });
  }, [count]);
  return (
    <div className={styles['page-controller']} data-variant={variant}>
      {variant === 'standard' && <>
        <div className={styles['page-controller-info']}><p className={styles['page-controller-info-text']}>{t('common.showing')} </p> {(currentPage - 1) * limit + 1}-
          {Math.min(currentPage * limit, count)} {t('common.of')} {count}</div>
        <div className={styles['page-controller-buttons']}>
          <button onClick={decreasePage} className={`${styles['page-controller-button']} ${styles['page-button--left']}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9">
                <path d="M15.41 16.4064L10.83 12L15.41 7.59359L14 6.23999L8 12L14 17.76L15.41 16.4064Z" fill="#202224" />
              </g>
            </svg>
          </button>
          <button onClick={increatePage} className={`${styles['page-controller-button']} ${styles['page-button--right']}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9">
                <path d="M8.59 16.4064L13.17 12L8.59 7.59359L10 6.23999L16 12L10 17.76L8.59 16.4064Z" fill="#202224" />
              </g>
            </svg>
          </button>
        </div>
      </>}
      {variant === 'date' &&
        <>
          <button onClick={decreaseDate} className={`${styles['page-controller-button']} ${styles['page-button--left']}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9">
                <path d="M15.41 16.4064L10.83 12L15.41 7.59359L14 6.23999L8 12L14 17.76L15.41 16.4064Z" fill="#202224" />
              </g>
            </svg>
            {t('common.prevDate')}
          </button>
          <button onClick={increaseDate} className={`${styles['page-controller-button']} ${styles['page-button--right']}`}>
            {t('common.nextDate')}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.9">
                <path d="M8.59 16.4064L13.17 12L8.59 7.59359L10 6.23999L16 12L10 17.76L8.59 16.4064Z" fill="#202224" />
              </g>
            </svg>
          </button>
        </>
      }
    </div>
  );
}

export default PageController;