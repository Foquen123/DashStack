import Slider from '../Slider/Slider';
import styles from './ProductCard.module.css';
import type { ProuductCardProps } from './ProductCard.props';
import { useProductStore } from '../../store/productStore';
import { useTranslation } from 'react-i18next';

function ProductCard({ id }: ProuductCardProps) {
  // const [isLiked, setIsLiked] = useState<boolean>(isProductLiked);
  // const product = useProductStore((state) =>
  //   state.products.find((p) => p.id === id)
  // );

  const { t } = useTranslation();
  const product = useProductStore((state) => state.productsMap[id]);

  const changeFavoriteStatus = useProductStore((state) => state.changeFavoriteStatus);

  if (!product) return null;
  console.log('card rerender');
  return (
    <div className={styles['card']}>
      <div className={styles['image']}><Slider sliderSize='small' slides={product.imgs.map((i, index) => [<img key={index} src={i} alt="" />])}></Slider></div>
      <div className={styles['details']}>
        <div className={styles['row']}>
          <div className={styles['info']}>
            <div className={styles['title']}>{product.title}</div>
            <div className={styles['price']}>${product.price}</div>
            <div className={styles['rating-container']}>
              <div className={styles['rating']}>
                <ul className={styles['rating-background']}>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.954753" fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#3F4A5C" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.954753" fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#3F4A5C" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.954753" fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#3F4A5C" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.954753" fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#3F4A5C" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.954753" fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#3F4A5C" />
                    </svg>
                  </li>
                </ul>
                <ul className={styles['rating-foreground']} style={{ width: `${product.rating * 20}%` }}>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#FF9500" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#FF9500" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#FF9500" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#FF9500" />
                    </svg>
                  </li>
                  <li>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.6084 10.88L2.90612 14.4721L4.86936 8.88997L-5.37038e-05 5.52786L5.91558 5.67003L7.6084 0L9.30122 5.67003L15.2169 5.52786L10.3474 8.88997L12.3107 14.4721L7.6084 10.88Z" fill="#FF9500" />
                    </svg>
                  </li>
                </ul>

              </div >
              <div className={styles['rating']}>({product.ratingCount})</div>
            </div>
          </div>
          <button data-is-liked={product.isProductLiked} onClick={() => { changeFavoriteStatus(id); }} className={styles['like-btn']}>
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.64062 1.95898C6.72094 1.01874 5.42039 0.591202 4.14551 0.802734C2.86997 1.01445 1.76407 1.8422 1.17969 3.03711C0.395761 4.64047 0.705646 6.57574 1.93945 7.83789C1.94299 7.84151 1.94673 7.84494 1.9502 7.84863L9.5 15.9033L17.0488 7.85156L17.0596 7.83984L17.2803 7.5957C18.2593 6.42097 18.5218 4.77823 17.9541 3.3418L17.8193 3.03711C17.2349 1.84217 16.1291 1.01439 14.8535 0.802734C13.5786 0.591194 12.2781 1.01866 11.3584 1.95898L10.0361 3.31055C9.89513 3.45466 9.70161 3.53603 9.5 3.53613C9.2983 3.53613 9.10495 3.45469 8.96387 3.31055L7.6416 1.95898H7.64062Z" stroke="#F93C65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <button className={styles['edit-btn']}>{t('products.editBtn')}</button>
      </div>

    </div>
  );
}

export default ProductCard;