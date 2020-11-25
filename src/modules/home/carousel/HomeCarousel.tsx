import React from 'react';
import './HomeCarousel.scss';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import slider2 from 'assets/images/slider2.jpg';
import slider3 from 'assets/images/slider3.jpg';
import { useTranslation } from 'react-i18next';
import productImage from 'assets/images/slider.png';
const HomeCarousel: React.FC = () => {
  const { t } = useTranslation();
  const handleDragStart = (e: any) => e.preventDefault();

  const items = [
    <div className="carouselItem container" key="carouselItem1">
      <div className="carouselItem__img right">
        <img src={productImage} alt="carousel item" onDragStart={handleDragStart} className="carousel__item" />
      </div>
      <div className="carouselItem__text left">
        <h5>{t('SAN_PHAM_MOI')}</h5>
        <h1 className="animate__animated animate__fadeIn" style={{ animationDelay: '2s' }}>
          Máy toàn đạc điện tử
          <br />
          <span>Nikon DTM-322+ 5"</span>
        </h1>
        <button>{t('MUA_NGAY').toUpperCase()}</button>
      </div>
    </div>,
    <div className="carouselItem container" key="carouselItem2">
      <div className="carouselItem__img--fullScreen">
        <img src={slider3} onDragStart={handleDragStart} alt="" />
      </div>
    </div>,
    <div className="carouselItem" key="carouselItem3">
      <div className="carouselItem__img--fullScreen">
        <img src={slider2} onDragStart={handleDragStart} alt="" />
      </div>
    </div>
  ];

  return (
    <div className="homeCarousel">
      <AliceCarousel infinite={true} disableButtonsControls={true} mouseTracking={true} items={items} />
    </div>
  );
};
export default HomeCarousel;
