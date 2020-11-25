import React, { useState } from 'react';
import useCart from 'stores/CartStore/cartStore';
import { CheckoutFormValues } from '../CheckoutWrapper.d';
import CheckoutForm from '../form/CheckoutForm';
import './CheckoutContent.scss';

const CheckoutContent: React.FC = () => {
  const [cartState, cartActions] = useCart();
  const [paymentType, setPaymentType] = useState('');
  const placeOrder = async (values: CheckoutFormValues) => {
    const data = {
      userInformation: values,
      paymentType,
      listOrder: cartState.listCart
    };

    await cartActions.placeOrder(data);
  };
  return (
    <div className="checkoutContent">
      <div className="container">
        <CheckoutForm placeOrder={placeOrder} setPaymentType={setPaymentType} />
      </div>
    </div>
  );
};
export default CheckoutContent;
