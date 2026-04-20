export interface StatCardProps {
  title: string;
  value: string;
  percent: number;
  infoText: string;
  icon: 0 | 1 | 2 | 3;
  direction: 'up' | 'down';
}
