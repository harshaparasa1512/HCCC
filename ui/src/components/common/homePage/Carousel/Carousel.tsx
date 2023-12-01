import type React from 'react';
import { useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import HeaderBanner from 'assets/headerBanner.png';


export default function Carousel(): React.ReactElement {
   const [currentSlide, setCurrentSlide] = useState<number>(0);

   const slides: React.ReactNode[] = [
      <div key="1">
         <img src="./images/facilities-ban2.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
      <div key="2">
         <img src="./images/karthika-masa.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
       <div key="3">
         <img src="./images/cal-2024.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
      <div key="4">
         <img src="./images/ayyappa-mandala.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
      <div key="5">
         <img src="./images/annadana-banner.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
      <div key="6">
         <img src="./images/young-adult-program.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
      <div key="7">
         <img src="./images/mobile-app-banner.jpg" style={{ height: '280px', width: '100%' }} />
      </div>,
   ];

   useEffect(() => {
      const intervalId = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => {
         clearInterval(intervalId);
      };
   }, [slides.length]);

   const handleButtonClick = (index: number): void => {
      setCurrentSlide(index);
   };

   return (
      <div className={styles.CarouselWrapper}>
         <div className={styles.CarouselContainer}>
            <div
               className={styles.SlideContainer}
               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
               {slides.map((slide, index) => (
                  <div className={styles.Slide} key={index}>
                     {slide}
                  </div>
               ))}
            </div>
            <div className={styles.ButtonContainer}>
               {slides.map((_, index) => (
                  <button
                     key={index}
                     className={
                        index === currentSlide
                           ? `${styles.Button} ${styles.active}`
                           : `${styles.Button}`
                     }
                     onClick={() => {
                        handleButtonClick(index);
                     }}
                  />
               ))}
            </div>
         </div>
      </div>
   );
}
