import type { ILabel } from './Label.interface';

export interface IInboxMessage {
  id: string;
  name: string;
  isStarred: boolean;
  message: string;
  time: string;
  label: ILabel;
}
