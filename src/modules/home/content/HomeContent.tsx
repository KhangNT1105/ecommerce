import ListProducts from 'components/listProducts/ListProducts';
import React from 'react';
import './HomeContent.scss';
import { useTranslation } from 'react-i18next';
import useProduct from 'stores/ProductStore/productStore';
import useCart from 'stores/CartStore/cartStore';
import { ProductValue } from 'stores/ProductStore/productStore.d';

const HomeContent: React.FC = () => {
  const { t } = useTranslation();
  const [stateProduct] = useProduct();
  const [, cartActions] = useCart();
  const handleAddToCart = (product: ProductValue) => {
    cartActions.addProduct(product);
  };
  return (
    <div className="homeContent">
      <div className="container">
        <div className="row">
          <div className="col-md-12 homeContent__left">
            <ListProducts
              title={t('SAN_PHAM_MOI')}
              items={stateProduct.listProduct}
              handleAddToCart={handleAddToCart}
            />
            <ListProducts
              title={t('SAN_PHAM_PHO_BIEN')}
              items={stateProduct.listProduct}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeContent;
