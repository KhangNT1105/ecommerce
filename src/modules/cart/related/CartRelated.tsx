import ListProducts from 'components/listProducts/ListProducts';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useCart from 'stores/CartStore/cartStore';
import useProduct from 'stores/ProductStore/productStore';
import { ProductValue } from 'stores/ProductStore/productStore.d';
import './CartRelated.scss';

const CartRelated: React.FC = () => {
  const [productState] = useProduct();
  const [, cartActions] = useCart();
  const { t } = useTranslation();
  const handleAddToCart = (product: ProductValue) => {
    cartActions.addProduct(product);
  };
  return (
    <div className="cartRelated">
      <div className="container">
        <ListProducts
          title={t('SAN_PHAM_TUONG_TU')}
          items={productState.listProduct}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};
export default CartRelated;
