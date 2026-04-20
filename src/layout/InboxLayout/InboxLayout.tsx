import { Outlet, useOutletContext } from 'react-router';
import styles from './InboxLayout.module.css';
import PageTitle from '../../components/PageTitle/PageTitle';
import InboxSidebar from './InboxSidebar/InboxSidebar';
import useCssVariable from '../../hooks/useCssVariables';
import Search from '../../components/Search/Search';
import { useState } from 'react';
import { useInboxStore } from '../../store/inboxStore';
import PageController from '../../components/PageController/PageController';

type ContextType = { pagesCount: number, setPagesCount: (value: number) => void };

function InboxLayout() {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [pagesCount, setPagesCount] = useState<number>(0);

  const inboxStore = useInboxStore(state => state);

  const bgColor = useCssVariable('--bg');
  const textSecondaryColor = useCssVariable('--text-secondary');
  const textPrimaryColor = useCssVariable('--text-primary');
  // const currentPage = parseInt(searchParams.get('page') || '1', 10);


  return (
    <div className={styles['layout']}>
      <PageTitle>Inbox</PageTitle>
      <div className={styles['layout-inner']}>
        <InboxSidebar></InboxSidebar>
        <div className={styles['right-side']}>
          <div className={styles['container-wrapper']}>
            <div className={styles['container']}>
              <div className={styles['top']}>
                <div className={styles['search-container']}><Search background={bgColor} placeholderColor={textSecondaryColor} textColor={textPrimaryColor}></Search></div>

                <div className={styles['top-btns']}>
                  <button className={styles['top-btn']}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M14.2222 0H1.76889C0.786667 0 0.00888889 0.795556 0.00888889 1.77778L0 14.2222C0 15.2044 0.786667 16 1.76889 16H14.2222C15.2044 16 16 15.2044 16 14.2222V1.77778C16 0.795556 15.2044 0 14.2222 0ZM14.2222 10.6667H10.6667C10.6667 12.1378 9.47111 13.3333 8 13.3333C6.52889 13.3333 5.33333 12.1378 5.33333 10.6667H1.76889V1.77778H14.2222V10.6667ZM9.77778 6.22222H11.5556L8 9.77778L4.44444 6.22222H6.22222V3.55556H9.77778V6.22222Z" fill="white" />
                    </svg>
                  </button>
                  <button className={styles['top-btn']}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM7.2 12V7.2H8.8V12H7.2ZM7.2 4V5.6H8.8V4H7.2Z" fill="white" />
                    </svg>
                  </button>
                  <button className={styles['top-btn']}>
                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.33333 0.888889H12.4444V2.66667H0V0.888889H3.11111L4 0H8.44444L9.33333 0.888889ZM2.66667 16C1.68889 16 0.888889 15.2 0.888889 14.2222V3.55556H11.5556V14.2222C11.5556 15.2 10.7556 16 9.77778 16H2.66667Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
              <Outlet context={{ pagesCount, setPagesCount } satisfies ContextType}></Outlet>
            </div>
            <PageController count={inboxStore.countOfItems} limit={inboxStore.limit}></PageController>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePagesCount() {
  return useOutletContext<ContextType>();
}

export default InboxLayout;