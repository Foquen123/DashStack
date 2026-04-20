import { useSearchParams } from 'react-router';
import { parseISO, isValid } from 'date-fns';

function useDatesFromUrl(): Date[] {
  const [searchParams] = useSearchParams();

  // Получаем все значения параметра 'date'
  const dateStrings = searchParams.getAll('date');

  // Парсим в Date и фильтруем невалидные
  const dates = dateStrings
    .map((dateStr) => parseISO(dateStr))
    .filter((date) => isValid(date));

  return dates;
}

export default useDatesFromUrl;