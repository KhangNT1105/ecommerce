import CustomHeader from 'components/customHeader/CustomHeader';
import React, { useEffect } from 'react';
import useProduct from 'stores/ProductStore/productStore';
import HomeCarousel from './carousel/HomeCarousel';
import HomeContent from './content/HomeContent';
import HomeHighlight from './highlight/HomeHighlight';
import './HomePageWrapper.scss';

const HomePageWrapper: React.FC = () => {
  const [, actionsProduct] = useProduct();
  useEffect(() => {
    actionsProduct.getProducts();
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="home">
      <CustomHeader color="grey" />
      <HomeCarousel />
      <HomeHighlight />
      <HomeContent />
    </div>
  );
};
export default HomePageWrapper;
