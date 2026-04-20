import { useEffect, useState } from 'react';

// Хук для чтения CSS-переменной
function useCssVariable(variableName: string) {
  const [value, setValue] = useState('');

  useEffect(() => {
    // Функция чтения
    const readVariable = () => {
      const html = document.documentElement;
      const color = getComputedStyle(html)
        .getPropertyValue(variableName)
        .trim();
      setValue(color);
    };

    readVariable(); // Читаем при монтировании и смене темы

    // Опционально: подписываемся на изменение атрибута темы
    const observer = new MutationObserver(readVariable);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, [variableName]); // theme здесь не обязателен, если используем MutationObserver, но оставим для надежности

  return value;
}

export default useCssVariable;