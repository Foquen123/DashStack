import { create } from 'zustand';
import { productsExample } from '../exampleData';
import type { IProduct } from '../interfaces/Product.interface';

interface ProductStore {
  productsMap: Record<string, IProduct>;
  changeFavoriteStatus: (id: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  productsMap: productsExample.reduce<Record<string, IProduct>>(
    (acc, product) => {
      acc[product.id] = product;
      return acc;
    },
    {},
  ),

  changeFavoriteStatus: (id: string) => {
    set((state) => ({
      productsMap: {
        ...state.productsMap,
        [id]: {
          ...state.productsMap[id],
          isProductLiked: !state.productsMap[id].isProductLiked,
        },
      },
    }));
  },
}));

export { useProductStore };
