import { useSidebarStore } from '../../../store/sidebarStore';
import styles from './Topbar.module.css';
import { useTheme } from '../../../context/ThemeContext';
import Search from '../../../components/Search/Search';
import useCssVariable from '../../../hooks/useCssVariables';
import EnFlag from '@/assets/enFlag.png';
import RuFlag from '@/assets/ruFlag.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LIGHT_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_1216_17205)">
    <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 1V3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 21V23" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.21997 4.22L5.63997 5.64" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.36 18.36L19.78 19.78" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1 12H3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 12H23" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.21997 19.78L5.63997 18.36" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.36 5.64L19.78 4.22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </g>
  <defs>
    <clipPath id="clip0_1216_17205">
      <rect width="24" height="24" fill="white" />
    </clipPath>
  </defs>
</svg>;

const DARK_ICON = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1583 17.4668C18.1127 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41104 20.3741 6.88302 19.5345 5.67425 18.3258C4.46548 17.117 3.62596 15.589 3.25393 13.9205C2.8819 12.252 2.99274 10.5121 3.57348 8.9043C4.15423 7.29651 5.18085 5.88737 6.53324 4.84175C7.88562 3.79614 9.50782 3.15731 11.21 3C10.2134 4.34827 9.73387 6.00945 9.85856 7.68141C9.98324 9.35338 10.7039 10.9251 11.8894 12.1106C13.075 13.2961 14.6466 14.0168 16.3186 14.1415C17.9906 14.2662 19.6518 13.7866 21 12.79Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>;

type Lang = {
  imgSrc: string;
  name: string;
  code: 'en' | 'ru',
}

function Topbar() {
  const langs: Lang[] = [
    {
      imgSrc: EnFlag,
      name: 'English',
      code: 'en',
    },
    {
      imgSrc: RuFlag,
      name: 'Русский',
      code: 'ru',
    }
  ];

  const { theme, toggleTheme } = useTheme();
  const { toggle } = useSidebarStore(store => store);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const [lang, setLang] = useState<Lang>(langs.find(i => i.code === i18n.language) || langs[0]);
  console.log(i18n.language);
  const changeLanguage = async (lang: 'en' | 'ru') => {
    await i18n.changeLanguage(lang);
  };

  const bgColor = useCssVariable('--bg');
  const textSecondaryColor = useCssVariable('--text-secondary');
  const textPrimaryColor = useCssVariable('--text-primary');

  const onChangeLang = (lang: Lang) => {
    setLang(lang);
    changeLanguage(lang.code);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className={styles['header']}>
      <button onClick={toggle} className={styles['burger']}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 6H20V8H12V6ZM4 16H12V18H4V16ZM20 11H4V13H20V11Z" fill="#202224" />
          <path d="M20 6H20.25V5.75H20V6ZM12 6V5.75H11.75V6H12ZM20 8V8.25H20.25V8H20ZM12 8H11.75V8.25H12V8ZM12 16H12.25V15.75H12V16ZM4 16V15.75H3.75V16H4ZM12 18V18.25H12.25V18H12ZM4 18H3.75V18.25H4V18ZM4 11V10.75H3.75V11H4ZM20 11H20.25V10.75H20V11ZM4 13H3.75V13.25H4V13ZM20 13V13.25H20.25V13H20ZM20 5.75H12V6.25H20V5.75ZM20.25 8V6H19.75V8H20.25ZM12 8.25H20V7.75H12V8.25ZM11.75 6V8H12.25V6H11.75ZM12 15.75H4V16.25H12V15.75ZM12.25 18V16H11.75V18H12.25ZM4 18.25H12V17.75H4V18.25ZM3.75 16V18H4.25V16H3.75ZM4 11.25H20V10.75H4V11.25ZM4.25 13V11H3.75V13H4.25ZM20 12.75H4V13.25H20V12.75ZM19.75 11V13H20.25V11H19.75Z" />
        </svg>
      </button>

      <div className={styles['search-container']}><Search background={bgColor} placeholderColor={textSecondaryColor} textColor={textPrimaryColor}></Search></div>
      <div className={styles['actions']}>
        <button onClick={toggleTheme} className={styles['change-theme']}>
          {theme === 'light' && LIGHT_ICON}
          {theme === 'dark' && DARK_ICON}
        </button>
        <div className={styles['lang']}>
          <img src={lang.imgSrc} alt="" />
          <button className={styles['choose-lang']} onClick={() => setIsLangDropdownOpen(prev => !prev)}>
            <p className={styles['lang-name']}>{lang.name}</p>
            <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.08333 3.25838L0.995812 0.170854C0.768006 -0.0569515 0.39866 -0.0569515 0.170854 0.170854C-0.0569515 0.39866 -0.0569515 0.768006 0.170854 0.995812L3.67085 4.49581C3.89866 4.72362 4.26801 4.72362 4.49581 4.49581L7.99581 0.995812C8.22362 0.768006 8.22362 0.39866 7.99581 0.170854C7.76801 -0.0569515 7.39866 -0.0569515 7.17085 0.170854L4.08333 3.25838Z" fill="#fff" />
              <mask id="mask0_0_40386" maskUnits="userSpaceOnUse" x="0" y="0" width="9" height="5">
                <path d="M4.08333 3.25838L0.995812 0.170854C0.768006 -0.0569515 0.39866 -0.0569515 0.170854 0.170854C-0.0569515 0.39866 -0.0569515 0.768006 0.170854 0.995812L3.67085 4.49581C3.89866 4.72362 4.26801 4.72362 4.49581 4.49581L7.99581 0.995812C8.22362 0.768006 8.22362 0.39866 7.99581 0.170854C7.76801 -0.0569515 7.39866 -0.0569515 7.17085 0.170854L4.08333 3.25838Z" />
              </mask>
              <g mask="url(#mask0_0_40386)">
              </g>
            </svg>
          </button>
          <div className={styles['lang-dropdown']} data-is-open={isLangDropdownOpen}>
            {langs.map(l =>
              <button onClick={() => onChangeLang(l)} key={l.name} className={styles['lang-item']} data-is-select={lang.name === l.name}>
                {l.name}
              </button>)}
          </div>
        </div>
        <div className={styles['user']}>
          <img src="/avatar.png" alt="" />
          <div className={styles['user-info']}>
            <p className={styles['user-name']}>Moni Roy</p>
            <p className={styles['user-role']}>Admin</p>
          </div>
          <button className={styles['user-dropdown']}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.19995 0.100391C14.2257 0.100391 18.2996 4.17421 18.2996 9.2C18.2996 14.2258 14.2257 18.2996 9.19995 18.2996C4.17416 18.2996 0.100342 14.2258 0.100342 9.2C0.100342 4.17421 4.17416 0.100391 9.19995 0.100391Z" stroke="#fff" strokeWidth="0.2" />
              <path d="M9.19995 9.99289L6.93157 7.34645C6.7642 7.15119 6.49284 7.15119 6.32548 7.34645C6.15811 7.54171 6.15811 7.85829 6.32548 8.05355L8.89691 11.0536C9.06427 11.2488 9.33563 11.2488 9.503 11.0536L12.0744 8.05355C12.2418 7.85829 12.2418 7.54171 12.0744 7.34645C11.9071 7.15119 11.6357 7.15119 11.4683 7.34645L9.19995 9.99289Z" fill="#fff" />
              <mask id="mask0_0_40373" maskUnits="userSpaceOnUse" x="6" y="7" width="7" height="5">
                <path d="M9.19995 9.99289L6.93157 7.34645C6.7642 7.15119 6.49284 7.15119 6.32548 7.34645C6.15811 7.54171 6.15811 7.85829 6.32548 8.05355L8.89691 11.0536C9.06427 11.2488 9.33563 11.2488 9.503 11.0536L12.0744 8.05355C12.2418 7.85829 12.2418 7.54171 12.0744 7.34645C11.9071 7.15119 11.6357 7.15119 11.4683 7.34645L9.19995 9.99289Z" />
              </mask>
              <g mask="url(#mask0_0_40373)">
              </g>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;