import styles from './PageTitle.module.css';
import type { PageTitleProps } from './PageTitle.props';

function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className={styles['title']}>{children}</h1>
  );
}

export default PageTitle;