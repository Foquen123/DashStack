import { useEffect, useState, type ReactNode } from 'react';
import SidebarNav from '../../../components/SidebarNav/SidebarNav';
import styles from './InboxSidebar.module.css';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { useSearchParams } from 'react-router';
import { useInboxStore } from '../../../store/inboxStore';
import { useTranslation } from 'react-i18next';
import '../../../i18n/i18n';

const useResponsive = () => {
  const [value, setValue] = useState(() => window.innerWidth > 950);

  useEffect(() => {
    const handleResize = () => setValue(window.innerWidth > 950);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [value, setValue] as const;
};

function SidebarNavInner({ icon, text, count, isOpen = true }: { icon: ReactNode, text: string, count: number, isOpen?: boolean }) {
  return (
    <div className={styles['sidebar-nav-inner']}>
      <div className={styles['sidebar-nav-inner-left']}>{icon}{isOpen && text}</div>
      <div className={styles['sidebar-nav-inner-right']}>{isOpen && count}</div>
    </div>
  );
}

function SidebarLabel({ color, text }: { color: string, text: string }) {
  const KEY = 'label';

  // const { theme } = useTheme();
  // const [primaryColor, setPrimaryColor] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleParam = (active: boolean) => {
    if (active) {
      setSearchParams(prev => {
        prev.append(KEY, text.toLowerCase()); // Добавляем или обновляем параметр
        return prev;
      });
    }
    if (!active) {

      const removeByValue = (key: string, valueToRemove: string) => {
        setSearchParams(prev => {
          const currentValues = prev.getAll(key);
          const newValues = currentValues.filter(v => v !== valueToRemove);
          const newParams = new URLSearchParams();
          for (const [k, v] of prev.entries()) {
            if (k !== key) {
              newParams.append(k, v);
            }
          }
          newValues.forEach(v => newParams.append(key, v));
          return newParams;
        });
      };
      removeByValue(KEY, text.toLowerCase());
    }
  };

  const keywords = searchParams.getAll(KEY);

  const isActive = keywords.includes(text.toLowerCase());

  // useEffect(() => {
  //   const html = document.documentElement;
  //   const color = getComputedStyle(html)
  //     .getPropertyValue('--primary')
  //     .trim();

  //   // setPrimaryColor(color);
  // }, [theme]);



  return (
    <div className={styles['label']}>
      <Checkbox checked={isActive} id={`checkbox-${text}`} backgroundColor={color} borderColor={color} onChange={(value) => handleParam(value.target.checked)}></Checkbox>
      <label className={styles['label-text']} htmlFor={`checkbox-${text}`}>{text}</label>
    </div>
  );
}

function InboxSidebar() {
  const fetchOtherMessagesCount = useInboxStore(store => store.fetchOtherMessagesCount);
  const messagesCount = useInboxStore(store => store.otherMessagesCount);
  const [isOpen, setIsOpen] = useResponsive();
  const { t } = useTranslation();
  useEffect(() => {
    fetchOtherMessagesCount();
  }, []);
  return (
    <aside className={styles['sidebar']} data-is-close={!isOpen}>
      <div className={styles['sidebar-top']}>
        {isOpen && <button className={styles['sidebar-button']}>
          + {t('inbox.compose')}
        </button>}
        <button onClick={() => setIsOpen(!isOpen)} className={styles['sidebar-open-button']}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.9">
              <path d="M15.41 16.4064L10.83 12L15.41 7.59359L14 6.23999L8 12L14 17.76L15.41 16.4064Z" fill="#202224">
              </path>
            </g>
          </svg>
        </button>
      </div>
      <div className={styles['sidebar-body']}>
        <div className={`${styles['group']} ${styles['group-1']}`}>
          <p className={styles['group-title']}>{t('inbox.myEmail')}</p>
          <div className={styles['group-content']}>
            <SidebarNav variant='inbox' link=''>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.600098" y="0.6" width="15.2727" height="10.9091" rx="1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.6263 1L9.70341 5.55564C8.83861 6.22091 7.63439 6.22091 6.76959 5.55564L0.84668 1" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.inbox} text={t('inbox.inbox')}>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='starred'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.585 0.897163L10.8157 5.3165L15.109 5.74183C15.3177 5.75917 15.4973 5.89634 15.5689 6.09313C15.6405 6.28993 15.5911 6.51041 15.4423 6.65783L11.909 10.1598L13.219 14.9185C13.2738 15.1247 13.2025 15.3438 13.0369 15.4783C12.8713 15.6128 12.6423 15.6377 12.4517 15.5418L8.099 13.3865L3.75234 15.5392C3.56175 15.635 3.33268 15.6101 3.16711 15.4756C3.00153 15.3411 2.93025 15.122 2.985 14.9158L4.295 10.1572L0.759003 6.65516C0.610257 6.50774 0.560852 6.28726 0.632467 6.09047C0.704082 5.89367 0.883633 5.75651 1.09234 5.73916L5.38567 5.31383L7.613 0.897163C7.7064 0.714753 7.89407 0.6 8.099 0.6C8.30393 0.6 8.49161 0.714753 8.585 0.897163Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.starred} text={t('inbox.starred')}>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='sent'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.36671 6.92466C0.948123 6.80658 0.655386 6.42944 0.644826 5.99464C0.634266 5.55984 0.908349 5.16893 1.32071 5.03066L14.7014 0.666665C14.8801 0.608408 15.0764 0.655157 15.2096 0.787718C15.3429 0.92028 15.3907 1.11631 15.3334 1.29533L10.9727 14.6827C10.8351 15.0958 10.4438 15.3706 10.0085 15.3598C9.57314 15.3491 9.19586 15.0554 9.07871 14.636L7.58138 8.41533L1.36671 6.92466Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.2102 0.786667L7.58154 8.41533" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.sent} text='Sent'>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='draft'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M14.8934 1.3069C14.4347 0.850158 13.8125 0.595672 13.1652 0.600054C12.5179 0.604436 11.8992 0.867323 11.4468 1.33023L1.7801 10.9969L0.600098 15.6002L5.20343 14.4196L14.8701 4.7529C15.3331 4.30063 15.5961 3.68201 15.6005 3.03477C15.6049 2.38752 15.3503 1.76539 14.8934 1.3069Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.1709 1.6069L14.5936 5.02957" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1.78076 10.9962L5.20676 14.4162" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.draft} text={t('inbox.draft')}>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='spam'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.09993 12.5998C7.96186 12.5998 7.84993 12.7118 7.84993 12.8498C7.84993 12.9879 7.96186 13.0998 8.09993 13.0998C8.23801 13.0998 8.34993 12.9879 8.34993 12.8498C8.34993 12.7118 8.23801 12.5998 8.09993 12.5998V12.5998" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.09993 10.5999V5.59985" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.18077 1.27318C8.97836 0.861103 8.55921 0.600006 8.10011 0.600006C7.641 0.600006 7.22185 0.861103 7.01944 1.27318L0.704105 14.1385C0.549555 14.4529 0.568239 14.8248 0.753524 15.1221C0.938808 15.4195 1.26444 15.6001 1.61477 15.5998H14.5854C14.9358 15.6001 15.2614 15.4195 15.4467 15.1221C15.632 14.8248 15.6507 14.4529 15.4961 14.1385L9.18077 1.27318Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.spam} text={t('inbox.spam')}>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='important'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.6001 12.1216C12.1524 12.1216 12.6001 11.6739 12.6001 11.1216C12.6001 10.5693 12.1524 10.1216 11.6001 10.1216C11.0478 10.1216 10.6001 10.5693 10.6001 11.1216C10.6001 11.6739 11.0478 12.1216 11.6001 12.1216Z" stroke="#202224" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.4494 7.25493L12.7441 8.2236C12.845 8.55721 13.1871 8.75564 13.5268 8.6776L14.5081 8.45026C14.8901 8.3636 15.2839 8.53624 15.479 8.87587C15.674 9.2155 15.6247 9.64266 15.3574 9.92893L14.6708 10.6696C14.4328 10.9255 14.4328 11.3217 14.6708 11.5776L15.3574 12.3183C15.6247 12.6045 15.674 13.0317 15.479 13.3713C15.2839 13.711 14.8901 13.8836 14.5081 13.7969L13.5268 13.5696C13.1871 13.4916 12.845 13.69 12.7441 14.0236L12.4494 14.9883C12.337 15.3634 11.9917 15.6204 11.6001 15.6204C11.2085 15.6204 10.8632 15.3634 10.7508 14.9883L10.4554 14.0196C10.3548 13.6861 10.013 13.4876 9.67344 13.5656L8.69144 13.7929C8.30947 13.8796 7.91566 13.707 7.72058 13.3673C7.5255 13.0277 7.57479 12.6005 7.8421 12.3143L8.52877 11.5736C8.76674 11.3177 8.76674 10.9215 8.52877 10.6656L7.8421 9.92493C7.57479 9.63866 7.5255 9.2115 7.72058 8.87187C7.91566 8.53224 8.30947 8.3596 8.69144 8.44626L9.67344 8.6736C10.013 8.75159 10.3548 8.55311 10.4554 8.2196L10.7508 7.25093C10.8641 6.87604 11.21 6.61991 11.6016 6.62084C11.9932 6.62176 12.3379 6.87952 12.4494 7.25493Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5241 6.58826C15.1123 3.77024 13.0343 1.48263 10.2687 0.802767C7.5031 0.122906 4.6013 1.18635 2.92991 3.49226C1.25853 5.79817 1.15079 8.88682 2.65743 11.3036L0.600098 15.6216L4.9161 13.5656C5.14334 13.7069 5.37838 13.8354 5.6201 13.9503" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.important} text={t('inbox.important')}>
              </SidebarNavInner>
            </SidebarNav>
            <SidebarNav variant='inbox' link='bin'>
              <SidebarNavInner
                isOpen={isOpen}
                icon={<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.6 15H4.2C3.53726 15 3 14.4627 3 13.8V3H13.8V13.8C13.8 14.4627 13.2627 15 12.6 15Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.59971 11.4V6.60001" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.1998 11.4V6.60001" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0.600098 3.00001H16.2001" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.1999 0.600006H6.5999C5.93716 0.600006 5.3999 1.13726 5.3999 1.80001V3.00001H11.3999V1.80001C11.3999 1.13726 10.8626 0.600006 10.1999 0.600006Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>}
                count={messagesCount.bin} text={t('inbox.bin')}>
              </SidebarNavInner>
            </SidebarNav>
          </div>
        </div>
        <div className={`${styles['group']} ${styles['group-2']}`}>
          <p className={styles['group-title']}>{t('inbox.label')}</p>
          <div className={styles['group-content']}>
            <SidebarLabel color='#00b69b' text='Primary'></SidebarLabel>
            <SidebarLabel color='#3d369f' text='Social'></SidebarLabel>
            <SidebarLabel color='#d456fd' text='Work'></SidebarLabel>
            <SidebarLabel color='#f2ac34' text='Friends'></SidebarLabel>
          </div>
          <button className={styles['create-label']}>
            <p className={styles['create-label-plus']}>+</p>
            {t('inbox.createNewLabel')}
          </button>
        </div>
      </div>
    </aside >
  );
}

export default InboxSidebar;