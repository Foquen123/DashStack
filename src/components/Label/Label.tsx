
import styles from './Label.module.css';
import type { LabelProps } from './Label.props';

function Label({children, color, width}: LabelProps) {
  return (
    <div className={styles['label']} style={{ width: `${width}px`, backgroundColor: `${color}` }}>
      {children}
    </div>
  );
}

export default Label;