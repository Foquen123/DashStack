import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import PageTitle from '../../components/PageTitle/PageTitle';
import styles from './OrderList.module.css';
import Table from './Table/Table';
import PageController from '../../components/PageController/PageController';
import { useOrderStore } from '../../store/orderStore';
import Calender from './Dropdowns/Calender/Calender';
import React from 'react';
import OrderSelector from './Dropdowns/OrderSelector/OrderSelector';
import { statusLablesExample, typesExample } from '../../exampleData';
import { useSearchParams } from 'react-router';
import useDatesFromUrl from '../../hooks/useDatesFromUrl';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';

const useElementHeight = <T extends HTMLElement>(): [RefObject<T | null>, number] => {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateHeight = () => {
      setHeight(element.offsetHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return [ref, height];
};

function Filter({ text, children }: { text: string, children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { onClose: () => setIsOpen(false) } as Partial<typeof child.props>);
    }
    return child;
  });
  return (
    <div ref={rootRef} className={styles['filter']} data-is-open={isOpen} >
      <div className={styles['filter-inner']} onClick={() => setIsOpen(prev => !prev)}>
        {text}
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.415 8.71L12 13.295L16.585 8.71L18 10.125L12 16.125L6 10.125L7.415 8.71Z" fill="black" />
        </svg>
      </div>
      <div className={styles['filter-dropdown']}>
        {childrenWithProps}
      </div>
    </div>
  );
}

function OrderList() {
  const [ref, height] = useElementHeight<HTMLDivElement>();
  const [searchParams, setSearchParams] = useSearchParams();
  const orderStore = useOrderStore(state => state);
  const { t } = useTranslation();
  const dates = useDatesFromUrl();
  const clearFilters = () => {
    const page = searchParams.get('page');
    const newSearchParams = new URLSearchParams();
    if (page) newSearchParams.set('page', page);
    setSearchParams(newSearchParams);
  };
  return (
    <div className={styles['container']} >
      <PageTitle>{t('sidebar.orderList')}</PageTitle>

      <div ref={ref} className={styles['filter-container']} data-few-lines={height > 100}>
        <div className={styles['filter-container-icon']}>
          <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.5 9.75C15.8848 9.75 20.25 7.73528 20.25 5.25C20.25 2.76472 15.8848 0.75 10.5 0.75C5.11522 0.75 0.75 2.76472 0.75 5.25C0.75 7.73528 5.11522 9.75 10.5 9.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.75 5.25C0.75253 9.76548 3.85614 13.688 8.25 14.729V21C8.25 22.2426 9.25736 23.25 10.5 23.25C11.7426 23.25 12.75 22.2426 12.75 21V14.729C17.1439 13.688 20.2475 9.76548 20.25 5.25" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles['filter-container-text']}>{t('orderList.filterBy')}</div>
        <Filter text={t('orderList.date')}><Calender></Calender></Filter>
        <Filter text={t('orderList.orderType')}><OrderSelector footerText='*You can choose multiple Order type' title='Select Order Type'
          urlParamName='type' list={typesExample.map(t => t.name)}
        ></OrderSelector></Filter>
        <Filter text={t('orderList.orderStatus')}>
          <OrderSelector footerText='*You can choose multiple Order Status' title='Select Order Status'
            urlParamName='status' list={statusLablesExample.map(t => t.text)}
          ></OrderSelector>
        </Filter>
        <button onClick={clearFilters} className={styles['filter-container-reset']}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 3.75V0.75L5.25 4.5L9 8.25V5.25C11.4825 5.25 13.5 7.2675 13.5 9.75C13.5 12.2325 11.4825 14.25 9 14.25C6.5175 14.25 4.5 12.2325 4.5 9.75H3C3 13.065 5.685 15.75 9 15.75C12.315 15.75 15 13.065 15 9.75C15 6.435 12.315 3.75 9 3.75Z" fill="#EA0234" />
          </svg>
          {t('orderList.resetFilter')}
        </button>
      </div>
      <div className={styles['table-list']}>
        <div className={styles['table-container-wrapper']}>
          <div className={styles['table-container']}><Table></Table></div>
        </div>
        <PageController variant={dates.length === 1 ? 'date' : 'standard'} count={orderStore.countOfItems} limit={dates.length === 1 ? orderStore.countOfItems : orderStore.limit}></PageController>
      </div>

    </div>
  );
}

export default OrderList;