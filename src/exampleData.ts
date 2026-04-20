import type { IProduct } from './interfaces/Product.interface';
import productImage1 from '@/assets/product-1.png';
import { v4 } from 'uuid';
import type { ILabel } from './interfaces/Label.interface';
import type { IInboxMessage } from './interfaces/InboxMessage.interface';
import type { IOrder } from './interfaces/Order.interface';
import type { IOrderType } from './interfaces/OrderType.interface';
export const optionsExample = [
  { title: 'янв', value: '01' },
  { title: 'фев', value: '02' },
  { title: 'мар', value: '03' },
  { title: 'апр', value: '04' },
  { title: 'май', value: '05' },
  { title: 'июн', value: '06' },
  { title: 'июл', value: '07' },
  { title: 'авг', value: '08' },
  { title: 'сен', value: '09' },
  { title: 'окт', value: '10' },
  { title: 'ноя', value: '11' },
  { title: 'дек', value: '12' },
];

export const productsExample: IProduct[] = [
  {
    id: v4(),
    imgs: [productImage1, productImage1],
    isProductLiked: false,
    price: '120.00',
    rating: 4.5,
    ratingCount: 133,
    title: 'Apple Watch Series 4',
  },
  {
    id: v4(),
    imgs: [productImage1, productImage1],
    isProductLiked: true,
    price: '60.00',
    rating: 4.1,
    ratingCount: 61,
    title: 'Air-Max-270',
  },
  {
    id: v4(),
    imgs: [productImage1, productImage1],
    isProductLiked: false,
    price: '24.59',
    rating: 4.9,
    ratingCount: 63,
    title: 'Minimal Chair Tool',
  },
  {
    id: v4(),
    imgs: [productImage1, productImage1],
    isProductLiked: true,
    price: '24.59',
    rating: 4.9,
    ratingCount: 63,
    title: 'Minimal Chair Tool',
  },
  {
    id: v4(),
    imgs: [productImage1, productImage1],
    isProductLiked: false,
    price: '24.59',
    rating: 4.9,
    ratingCount: 63,
    title: 'Minimal Chair Tool',
  },
];

export const inboxLabelsExample: ILabel[] = [
  {
    id: v4(),
    color: '#00b69b',
    text: 'Primary',
  },
  {
    id: v4(),
    color: '#fd9a56',
    text: 'Work',
  },
  {
    id: v4(),
    color: '#d456fd',
    text: 'Friends',
  },
  {
    id: v4(),
    color: '#5a8cff',
    text: 'Social',
  },
];

const inboxMessagesExample: IInboxMessage[] = [
  {
    id: v4(),
    isStarred: false,
    message: 'Our Bachelor of Commerce program is ACBSP-accredited.',
    name: 'Jullu Jalal',
    time: '8:38 AM',
    label: inboxLabelsExample[0],
  },
  {
    id: v4(),
    isStarred: true,
    message: 'Get Best Advertiser In Your Side Pocket',
    name: 'Minerva Barnett',
    time: '8:13 AM',
    label: inboxLabelsExample[1],
  },
  {
    id: v4(),
    isStarred: false,
    message: 'Vacation Home Rental Success',
    name: 'Peter Lewis',
    time: '7:52 PM',
    label: inboxLabelsExample[2],
  },
  {
    id: v4(),
    isStarred: false,
    message: 'Free Classifieds Using Them To Promote Your Stuff Online',
    name: 'Anthony Briggs',
    time: '7:52 PM',
    label: inboxLabelsExample[3],
  },
];

for (let i = 0; i < 100; i++) {
  inboxMessagesExample.push({
    ...inboxMessagesExample[i % inboxMessagesExample.length],
    id: v4(),
  });
}

export { inboxMessagesExample };

export const statusLablesExample: ILabel[] = [
  {
    id: v4(),
    color: '#00b69b',
    text: 'Completed',
  },
  {
    id: v4(),
    color: '#6226ef',
    text: 'Processing',
  },
  {
    id: v4(),
    color: '#ef3826',
    text: 'Rejected',
  },
  {
    id: v4(),
    color: '#ffa756',
    text: 'On Hold',
  },
  {
    id: v4(),
    color: '#ba29ff',
    text: 'In Transit',
  },
];

export const typesExample: IOrderType[] = [
  {
    id: v4(),
    name: 'Electric',
  },
  {
    id: v4(),
    name: 'Book',
  },
  {
    id: v4(),
    name: 'Medicine',
  },
  {
    id: v4(),
    name: 'Mobile',
  },
  {
    id: v4(),
    name: 'Watch',
  },
];

const orderListExample: IOrder[] = [
  {
    id: '00001',
    address: '089 Kutch Green Apt. 448',
    name: 'Christine Brooks',
    date: new Date(2026, 8, 4),
    status: statusLablesExample[0],
    type: typesExample[0],
  },
  {
    id: '00002',
    address: '979 Immanuel Ferry Suite 526',
    name: 'Rosie Pearson',
    date: new Date('2026-05-28'),
    status: statusLablesExample[1],
    type: typesExample[1],
  },
  {
    id: '00003',
    address: '8587 Frida Ports',
    name: 'Darrell Caldwell',
    date: new Date('2026-11-23'),
    status: statusLablesExample[2],
    type: typesExample[2],
  },
  {
    id: '00004',
    address: '768 Destiny Lake Suite 600',
    name: 'Gilbert Johnston',
    date: new Date('2026-02-05'),
    status: statusLablesExample[3],
    type: typesExample[3],
  },
];

function formatNumber(num: number) {
  return String(num).padStart(5, '0');
}

const orderListStartLength = orderListExample.length;
for (let i = 5; i < 100; i++) {
  orderListExample.push({
    ...orderListExample[i % orderListStartLength],
    id: formatNumber(i),
  });
}

export { orderListExample };
