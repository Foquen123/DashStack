import { useSidebarStore } from '../../../store/sidebarStore';
import styles from './Sidebar.module.css';
import SidebarNav from '../../../components/SidebarNav/SidebarNav';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n';

const getClasses = (isOpen: boolean) => {
  let classes = `${styles['sidebar']}`;
  if (isOpen) classes += ` ${styles['sidebar--open']}`;
  return classes;
};

const getClassesOverlay = (isOpen: boolean) => {
  let classes = 'overlay';
  if (isOpen) classes += ` ${styles['overlay--open']}`;
  return classes;
};

function Sidebar() {
  const { isOpen, close } = useSidebarStore(store => store);
  const { t } = useTranslation();
  return (
    <aside className={getClasses(isOpen)}>
      <div className={styles['sidebar-logo']}>
        <p><span className={styles['logo-accent']}>Dash</span>Stack</p>
      </div>
      <div className={styles['sidebar-body']}>
        <div className={styles['pages-list']}>
          <SidebarNav onClick={close} variant='main' link='/'>{t('sidebar.dashboard')}</SidebarNav>
          <SidebarNav onClick={close} variant='main' link='/products'>{t('sidebar.products')}</SidebarNav>
          <SidebarNav onClick={close} variant='main' link='/favorites'>{t('sidebar.favorites')}</SidebarNav>
          <SidebarNav onClick={close} variant='main' link='/inbox'>{t('sidebar.inbox')}</SidebarNav>
          <SidebarNav onClick={close} variant='main' link='/order-list'>{t('sidebar.orderList')}</SidebarNav>
        </div>
      </div>
      {createPortal(
        <div onClick={close} className={getClassesOverlay(isOpen)}></div>,
        document.body
      )}
    </aside>
  );
}

export default Sidebar;