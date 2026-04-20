export interface OrderSelectorProps {
  onClose?: () => void;
  urlParamName: string;
  list: string[];
  title: string;
  footerText: string;
}
