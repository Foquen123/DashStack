import styles from './DropdownWrapper.module.css';
import type { DropdownWrapperProps } from './DropdownWrapper.props';

function DropdownWrapper({ children, onApplyFilters, text }: DropdownWrapperProps) {


  return (
    <div className={styles['dropdown']}>
      {children}
      <div className={styles['footer']}>
        <div className={styles['footer-label']}>{text}</div>
        <button onClick={onApplyFilters} className={styles['apply-btn']}>Apply Now</button>
      </div>
    </div>
  );
}

export default DropdownWrapper;