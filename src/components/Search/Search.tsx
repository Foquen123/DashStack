import { useTranslation } from 'react-i18next';
import styles from './Search.module.css';
import type { SearchProps } from './Search.props';
import '../../i18n/i18n';

function Search({ background, textColor, placeholderColor, ...props }: SearchProps) {
  const customProperties = {
    '--bg': background,
    '--text-secondary': placeholderColor,
    '--text-primary': textColor,
  } as React.CSSProperties;
  const { t } = useTranslation();
  return (
    <div className={styles['search-container']} style={customProperties}>
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.69353 12.5352C12.4234 11.375 13.6959 8.22157 12.5357 5.49173C11.3755 2.76189 8.22208 1.48941 5.49225 2.64957C2.76241 3.80972 1.48993 6.96318 2.65008 9.69302C3.81024 12.4229 6.9637 13.6953 9.69353 12.5352Z" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.3903 11.3896L15.5556 15.5556" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <input {...props} type="text" className={styles['search-input']} placeholder={t('common.search')} />
    </div>
  );
}

export default Search;