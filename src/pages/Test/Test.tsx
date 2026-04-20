import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const useMeals = create(() => ({
  papaBear: 'large porridge-pot',
  mamaBear: 'middle-size porridge pot',
  littleBear: 'A little, small, wee pot',
}));

export const Test = () => {
  const names = useMeals(useShallow((state) => Object.keys(state)));
  return <div>{names.join(', ')}</div>;
};

