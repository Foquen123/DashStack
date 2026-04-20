import { useEffect, useRef, useState, type MouseEventHandler } from 'react';
import styles from './Select.module.css';

type Option = {
  title: string;
  value: string;
};
type OptionProps = {
  option: Option;
  onClick: (value: Option['value']) => void;
};
const OptionEl = (props: OptionProps) => {
  const {
    option: { value, title },
    onClick
  } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick = (
    clickedValue: Option['value']
  ): MouseEventHandler<HTMLLIElement> => () => {
    onClick(clickedValue);
  };

  useEffect(() => {
    const option = optionRef.current;
    if (!option) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === option && event.key === 'Enter') {
        onClick(value);
      }
    };

    option.addEventListener('keydown', handleEnterKeyDown);
    return () => {
      option.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, [value, onClick]);

  return (
    <li
      className={styles.option}
      value={value}
      onClick={handleClick(value)}
      tabIndex={0}
      data-testid={`select-option-${value}`}
      ref={optionRef}
    >
      {title}
    </li>
  );
};

type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  mode?: 'rows' | 'cells';
  status?: 'default' | 'invalid';
  onChange?: (selected: Option['value']) => void;
  onClose?: () => void;
};

const Select = (props: SelectProps) => {
  const {
    mode = 'rows',
    options,
    placeholder,
    status = 'default',
    selected,
    onChange,
    onClose
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        if (isOpen) onClose?.();
        setIsOpen(false);
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [onClose]);

  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener('keydown', handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener('keydown', handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: Option['value']) => {
    setIsOpen(false);
    onChange?.(value);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={styles['select-wrapper']}
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
      data-testid="selectWrapper"
    >
      <div
        onClick={handlePlaceHolderClick}
        className={styles['placeholder']}
        data-status={status}
        data-selected={!!selected?.value}

        role="button"
        tabIndex={0}
        ref={placeholderRef}
      >
        {selected?.title || placeholder}

        <div className={styles.arrow}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.85892 0.268115L5 4.29356L1.14108 0.268115C0.836791 -0.0819238 0.532503 -0.0892166 0.228216 0.246237C-0.076072 0.581691 -0.076072 0.909853 0.228216 1.23072L4.54357 5.78123C4.65422 5.92708 4.80636 6 5 6C5.19364 6 5.34578 5.92708 5.45643 5.78123L9.77178 1.23072C10.0761 0.909853 10.0761 0.581691 9.77178 0.246237C9.4675 -0.0892166 9.16321 -0.0819238 8.85892 0.268115Z" fill="white" fillOpacity="0.7" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <ul className={styles.select} data-testid="selectDropdown">
          {options.map((option) => (
            <OptionEl
              key={option.value}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;