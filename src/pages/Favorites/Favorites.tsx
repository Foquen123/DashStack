import { useShallow } from 'zustand/react/shallow';
import PageTitle from '../../components/PageTitle/PageTitle';
import ProductCard from '../../components/ProductCard/ProductsCard';
import { useProductStore } from '../../store/productStore';
import styles from './Favorites.module.css';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';

function Favorites() {
  const products = useProductStore(useShallow(store => Object.values(store.productsMap)));
  const { t } = useTranslation();

  return (
    <div className={styles['container']}>
      <PageTitle>{t('sidebar.favorites')}</PageTitle>
      <div className={styles['product-container']}>
        {products.filter(p => p.isProductLiked).map(p => <ProductCard id={p.id} key={p.id}>
        </ProductCard>)}
      </div>
    </div>
  );
}

export default Favorites;