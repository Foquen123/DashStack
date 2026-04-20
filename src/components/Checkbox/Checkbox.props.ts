import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  // onChange: (value: boolean) => void;
  backgroundColor: string;
  borderColor: string;
  shape?: 'rect' | 'star';
}
