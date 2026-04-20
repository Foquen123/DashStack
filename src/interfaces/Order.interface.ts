import type { ILabel } from './Label.interface';
import type { IOrderType } from './OrderType.interface';

export interface IOrder {
  id: string;
  name: string;
  address: string;
  date: Date;
  type: IOrderType;
  status: ILabel;
}
