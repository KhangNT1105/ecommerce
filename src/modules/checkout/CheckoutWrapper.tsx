import CustomHeader from 'components/customHeader/CustomHeader';
import React from 'react';
import CheckoutBanner from './banner/CheckoutBanner';
import './CheckoutWrapper.scss';
import CheckoutContent from './content/CheckoutContent';

const CheckoutWrapper: React.FC = () => {
  return (
    <div className="checkout">
      <CustomHeader />
      <CheckoutBanner />
      <CheckoutContent />
    </div>
  );
};
export default CheckoutWrapper;
