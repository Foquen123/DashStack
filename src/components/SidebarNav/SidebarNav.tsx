import { NavLink } from 'react-router';
import styles from './SidebarNav.module.css';
import type { ReactNode } from 'react';

type SidebarNavVariant = 'main' | 'inbox';

interface SidebarNavProps {
  children: ReactNode;
  link: string;
  variant: SidebarNavVariant;
  onClick?: () => void;
}

const getClasses = (isActive: boolean, variant: SidebarNavVariant) => {
  let classes = `${styles['link']}`;
  if (isActive) classes += ` ${styles['active']}`;
  if (variant === 'main') classes += ` ${styles['main']}`;
  if (variant === 'inbox') classes += ` ${styles['inbox']}`;
  return classes;
};

function SidebarNav({ children, link, variant, onClick }: SidebarNavProps) {
  // const { close } = useSidebarStore(store => store);
  return (
    <NavLink onClick={onClick} end={variant === 'inbox'} to={link} className={({ isActive }) => getClasses(isActive, variant)}>
      <div className={styles['link-inner']}>{children}</div>
    </NavLink>
  );
}

export default SidebarNav;