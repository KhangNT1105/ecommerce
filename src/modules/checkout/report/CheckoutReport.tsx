import React from 'react';
import { useTranslation } from 'react-i18next';
import useCart from 'stores/CartStore/cartStore';
import { CartValues } from 'stores/CartStore/cartStore.d';
import './CheckoutReport.scss';

const CheckoutReport: React.FC = () => {
  const { t } = useTranslation();
  const [cartState] = useCart();
  const renderProducts = () => {
    return cartState.listCart.map((item: CartValues, index: number) => {
      const product = `${item.product.name} x ${item.quantity}`;
      const total = item.product.priceDiscount
        ? item.product.priceDiscount * item.quantity
        : item.product.price
        ? item.product.price * item.quantity
        : t('LIEN_HE');
      return (
        <div className="product" key={index}>
          <div className="product__name">{product}</div>
          <div className="product__total">
            {typeof total === 'string' ? total : new Intl.NumberFormat().format(total)}
            {typeof total === 'number' && (
              <u>
                <sup>đ</sup>
              </u>
            )}
          </div>
        </div>
      );
    });
  };
  const haveContactProduct = cartState.listCart.some((item: CartValues) => item.product.price == null);
  const totalPrice = cartState.listCart.reduce((accumulator: number, item: CartValues) => {
    // tslint:disable-next-line:no-parameter-reassignment
    return (accumulator += item.product.priceDiscount
      ? item.product.priceDiscount * item.quantity
      : item.product.price
      ? item.product.price * item.quantity
      : 0);
  }, 0);
  return (
    <div className="checkoutReport">
      <h1>{t('YOUR_ORDERS')}</h1>
      <div className="checkoutReport__header">
        <h2>{t('SAN_PHAM')}</h2>
        <h2>{t('TONG_TIEN')}</h2>
      </div>
      <div className="checkoutReport__products">{renderProducts()}</div>
      <div className="checkoutReport__total">
        <div className="totalPrice">
          <h4>{t('TONG_TIEN')}</h4>
          <h4 className="totalPrice__price">
            {new Intl.NumberFormat().format(totalPrice)}{' '}
            <sup>
              <u>đ</u>
            </sup>
          </h4>
        </div>
        {haveContactProduct && <div className="contactText">{t('HAVE_CONTACT_PRODUCT_CONTENT')}</div>}
      </div>
    </div>
  );
};
export default CheckoutReport;
