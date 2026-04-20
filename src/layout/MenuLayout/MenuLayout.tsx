import { Outlet } from 'react-router';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import styles from './MenuLayout.module.css';



function MenuLayout() {
  return (
    <div className={styles['layout']}>
      <Sidebar></Sidebar>
      <main className={styles['main']}>
        <Topbar></Topbar>
        <div className={styles['content']}>
          {/* <div className={styles['content-inner']}> */}
            <Outlet></Outlet>
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

export default MenuLayout;