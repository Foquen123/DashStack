import { useEffect, useState, type ReactNode } from 'react';
import DropdownWrapper from '../DropdownWrapper/DropdownWrapper';
import styles from './OrderSelector.module.css';
import { useSearchParams } from 'react-router';
import type { OrderSelectorProps } from './OrderSelector.props';

function ListItem({ isSelect, children, onSelect }: { isSelect: boolean, children: ReactNode, onSelect: () => void }) {
  return (
    <div onClick={onSelect} className={styles['list-item']} data-is-select={isSelect}>
      {children}
    </div>
  );
}

function OrderSelector({ footerText, list, title, urlParamName, onClose }: OrderSelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string[]>(searchParams.getAll(urlParamName));
  useEffect(() => {
    function updateSelected() {
      setSelected(searchParams.getAll(urlParamName));
    }
    updateSelected();
  }, [searchParams]);
  const handleSelect = (text: string) => {
    if (selected.includes(text.toLowerCase())) {
      setSelected(prev => prev.filter(p => p !== text.toLowerCase()));
    }
    else {
      setSelected(prev => [...prev, text.toLowerCase()]);
    }
  };

  const handleApplyFilters = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(urlParamName);
    selected.forEach(s => {
      newParams.append(urlParamName, s.toLowerCase());
    });

    setSearchParams(newParams);
    onClose?.();
  };
  // const mappedLabels = statusLablesExample.map(s => s.text);
  return (
    <DropdownWrapper text={footerText} onApplyFilters={handleApplyFilters}>
      <div className={styles['container']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['list']}>
          {list.map(s => <ListItem key={s} onSelect={() => handleSelect(s)} isSelect={selected.includes(s.toLowerCase())}>{s}</ListItem>)}
        </div>
      </div>
    </DropdownWrapper>
  );
}

export default OrderSelector;