import type { ReactNode } from 'react';

export interface DropdownWrapperProps {
  onApplyFilters: () => void;
  text: string;
  children: ReactNode;
}
