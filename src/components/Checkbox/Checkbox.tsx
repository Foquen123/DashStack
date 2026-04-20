import type { CheckboxProps } from './Checkbox.props';
import styles from './Checkbox.module.css';

function Checkbox({ backgroundColor, borderColor, shape = 'rect', ...props }: CheckboxProps) {
  // const [isChecked, setIsChecked] = useState(props.checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setIsChecked(e.target.checked);
    props.onChange?.(e);
  };

  const renderSVG = () => {
    if (shape === 'star') {
      return (
        <svg width="16" height="16" viewBox="0 0 18 18" fill={props.checked ? backgroundColor : 'none'} xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.1168 0.916978L11.4962 5.63091L16.0757 6.0846C16.2983 6.1031 16.4898 6.2494 16.5662 6.45932C16.6426 6.66924 16.5899 6.90441 16.4313 7.06166L12.6624 10.7971L14.0597 15.873C14.1181 16.0929 14.0421 16.3266 13.8655 16.4701C13.6889 16.6136 13.4445 16.6401 13.2412 16.5379L8.5984 14.2389L3.96198 16.535C3.75869 16.6373 3.51435 16.6107 3.33774 16.4673C3.16113 16.3238 3.0851 16.0901 3.1435 15.8702L4.54082 10.7943L0.769108 7.05882C0.610446 6.90157 0.557748 6.66639 0.634137 6.45648C0.710526 6.24656 0.902045 6.10025 1.12466 6.08175L5.7042 5.62807L8.08001 0.916978C8.17963 0.722408 8.37981 0.600006 8.5984 0.600006C8.81699 0.600006 9.01718 0.722408 9.1168 0.916978Z" stroke={props.checked ? backgroundColor : borderColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    } else {
      if (props.checked) {
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.77778 0H14.2222C15.2089 0 16 0.8 16 1.77778V14.2222C16 15.2 15.2089 16 14.2222 16H1.77778C0.791111 16 0 15.2 0 14.2222V1.77778C0 0.8 0.791111 0 1.77778 0ZM1.77778 8L6.22222 12.4444L14.2222 4.44444L12.9689 3.18222L6.22222 9.92889L3.03111 6.74667L1.77778 8Z" fill={backgroundColor} />
          </svg>
        );
      }
      else {
        return (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5996 0.599976H3.59961C1.94276 0.599976 0.599609 1.94312 0.599609 3.59998V13.6C0.599609 15.2568 1.94276 16.6 3.59961 16.6H13.5996C15.2565 16.6 16.5996 15.2568 16.5996 13.6V3.59998C16.5996 1.94312 15.2565 0.599976 13.5996 0.599976Z" stroke={borderColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      }
    }
  };

  return (
    <div className={styles['checkbox-container']} data-shape={shape}>
      <input  {...props} checked={props.checked} onChange={handleChange}
        type="checkbox"
        className={styles['label-checkbox']}
        style={{
          position: 'absolute',
          opacity: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }} />
      {renderSVG()}
    </div>
  );
}

export default Checkbox;