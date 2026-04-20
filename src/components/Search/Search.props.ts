import type { InputHTMLAttributes } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  background: string;
  textColor: string;
  placeholderColor: string;
}
