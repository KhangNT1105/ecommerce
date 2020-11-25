import CustomHeader from 'components/customHeader/CustomHeader';
import React, { useEffect } from 'react';
import useProduct from 'stores/ProductStore/productStore';
import CartBanner from './banner/CartBanner';
import './CartWrapper.scss';
import CartContent from './content/CartContent';
import CartRelated from './related/CartRelated';

const CartWrapper: React.FC = () => {
  const [, productActions] = useProduct();
  useEffect(() => {
    productActions.getProducts();
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="cart">
      <CustomHeader />
      <CartBanner />
      <CartContent />
      <CartRelated />
    </div>
  );
};
export default CartWrapper;
