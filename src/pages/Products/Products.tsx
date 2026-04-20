import styles from './Products.module.css';
import Slider from '../../components/Slider/Slider';
import slideBg from '@/assets/slide-bg.png';
import ProductCard from '../../components/ProductCard/ProductsCard';
import PageTitle from '../../components/PageTitle/PageTitle';
import { useProductStore } from '../../store/productStore';
import { useShallow } from 'zustand/react/shallow';
import { useTranslation } from 'react-i18next';
import '../../i18n/i18n';


function Slide() {
  const { t } = useTranslation();
  return (
    <div className={styles['slide-container']} style={{ backgroundImage: `url(${slideBg})` }}>
      <div className={styles['slide-date']}>{t('common.months.september')} 12-22</div>
      <div className={styles['slide-title']}>{t('products.sliderTitle')}</div>
      <div className={styles['slide-info']}>{t('products.sliderDesc')}</div>
      <button className={styles['slide-button']}>{t('products.getStarted')}</button>
    </div>
  );
}


function Products() {
  // const products = useProductStore((state) => state.products); // ✅ Подписка только на массив
  // const products = useProductStore(useShallow((state) => (state.products))); // ✅ Подписка только на массив
  const productIds = useProductStore(useShallow((state) => Object.keys(state.productsMap)));

  const { t } = useTranslation();
  return (
    <div className={styles['container']}>
      <PageTitle>{t('sidebar.products')}</PageTitle>
      <Slider sliderSize='big' slides={[<Slide></Slide>, <Slide></Slide>, <Slide></Slide>,]}></Slider>

      <div className={styles['product-container']}>
        {productIds.map(id => <ProductCard id={id} key={id}>
        </ProductCard>)}
      </div>

    </div>
  );
}

export default Products;