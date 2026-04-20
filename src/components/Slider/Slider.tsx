import type { ReactNode } from 'react';
import styles from './Slider.module.css';
import useEmblaCarousel from 'embla-carousel-react';

interface SliderProps {
  slides: ReactNode[];
  sliderSize?: 'small' | 'big';
}

function Slider({ slides, sliderSize = 'small' }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  return (

    <div className={styles['embla']} data-slider-size={sliderSize}>
      <button className={`${styles['button']} ${styles['button--prev']}`} onClick={scrollPrev}>
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.15991 10.59L3.57991 6L8.15991 1.41L6.74991 0L0.749912 6L6.74991 12L8.15991 10.59Z" fill="#363636" />
        </svg>
      </button>

      <div className={styles['embla__viewport']} ref={emblaRef}>
        <div className={styles['embla__container']}>
          {slides.map((s, i) =>
            <div key={i} className={styles['embla__slide']}>{s}</div>
          )}
        </div>
      </div>

      <button className={`${styles['button']} ${styles['button--next']}`} onClick={scrollNext}>
        <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.839844 10.59L5.41984 6L0.839844 1.41L2.24984 0L8.24984 6L2.24984 12L0.839844 10.59Z" fill="#363636" />
        </svg>
      </button>
    </div>

  );
}

export default Slider;