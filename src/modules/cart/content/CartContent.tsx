import Table from 'components/table/Table';
import React from 'react';
import './CartContent.scss';
import { Button } from 'reactstrap';
import Quantity from 'components/quantity/Quantity';
import { useTranslation } from 'react-i18next';
import useCart from 'stores/CartStore/cartStore';
import { CartValues } from 'stores/CartStore/cartStore.d';
import { useHistory } from 'react-router-dom';
import RoutesString from 'pages/routesString';
const CartContent: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useHistory();
  const [cartState, cartActions] = useCart();
  const setQuantityValue = (index: number, quantity: number) => {
    cartActions.quantityIncrement(index, quantity);
  };
  const handleClickCheckout = () => {
    push(RoutesString.Checkout);
  };
  const data = cartState.listCart.map((item: any, index: number) => {
    const updatedPrice = item.product.price ? (
      <div>
        {item.product.priceDiscount ? (
          <>
            <span className="priceBefore price">
              <del>
                {new Intl.NumberFormat().format(item.product.price)}
                <u>
                  <sup>đ</sup>
                </u>
              </del>
            </span>
            <span className="currentPrice price">
              {new Intl.NumberFormat().format(item.product.priceDiscount)}
              <u>
                <sup>đ</sup>
              </u>
            </span>
          </>
        ) : (
          <span className="currentPrice price">
            {new Intl.NumberFormat().format(item.product.price)}
            <u>
              <sup>đ</sup>
            </u>
          </span>
        )}
      </div>
    ) : (
      <span className="currentPrice price">{t('LIEN_HE')}</span>
    );
    const total = item.product.priceDiscount
      ? item.product.priceDiscount * item.quantity
      : item.product.price
      ? item.product.price * item.quantity
      : t('LIEN_HE');
    return {
      productImage: (
        <div className="cartImage">
          <Button outline={true}>x</Button>
          <img src={item.product.image} alt="" />
        </div>
      ),
      productName: item.product.name,
      productPrice: <div className="price">{updatedPrice} </div>,
      productQuantity: (
        <Quantity defaultNumber={item.quantity} setValue={(quantity) => setQuantityValue(index, quantity)} />
      ),
      productTotal: (
        <span className="currentPrice price">
          {typeof total === 'string' ? total : new Intl.NumberFormat().format(total)}
          {typeof total === 'number' && (
            <u>
              <sup>đ</sup>
            </u>
          )}
        </span>
      )
    };
  });
  const titleList = ['', t('SAN_PHAM'), t('GIA'), t('SO_LUONG'), t('TONG_TIEN')];
  const pathList = ['productImage', 'productName', 'productPrice', 'productQuantity', 'productTotal'];
  const haveContactProduct = cartState.listCart.some((item: CartValues) => item.product.price == null);
  const total = cartState.listCart.reduce((accumulator: number, item: CartValues) => {
    // tslint:disable-next-line:no-parameter-reassignment
    return (accumulator += item.product.priceDiscount
      ? item.product.priceDiscount * item.quantity
      : item.product.price
      ? item.product.price * item.quantity
      : 0);
  }, 0);
  return (
    <div className="cartContent">
      <div className="cartContent__container container">
        <div className="cartContent__list">
          <Table data={data} titleList={titleList} pathList={pathList} />
        </div>
        {cartState.listCart.length > 0 && (
          <div className="cartContent__checkout">
            <h4>{t('THANH_TOAN_GIO_HANG')}</h4>
            <div className="cartContent__total">
              <h5>{t('TONG_TIEN')}</h5>
              <span className="currentPrice price">
                {new Intl.NumberFormat().format(total)}
                <u>
                  <sup>đ</sup>
                </u>
              </span>
            </div>
            {haveContactProduct && <p>{t('HAVE_CONTACT_PRODUCT_CONTENT')}</p>}
            <Button className="buttonCheckout" onClick={handleClickCheckout}>
              {t('THANH_TOAN')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartContent;
