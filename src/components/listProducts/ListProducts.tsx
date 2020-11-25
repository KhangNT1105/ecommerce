import React from 'react';
import './ListProducts.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ListProductsProps } from './ListProducts.d';
import Product from 'components/product/Product';

import { ProductValue } from 'stores/ProductStore/productStore.d';

const ListProducts: React.FC<ListProductsProps> = ({ items, title, handleAddToCart }) => {
  const productItems = items.map((item: ProductValue, index: number) => (
    <Product handleAddToCart={handleAddToCart} key={`${item._id}-${index}`} product={item} />
  ));
  const responsive = {
    0: { items: 3 },
    1024: { items: 4 }
  };
  return (
    <div className="listProducts">
      <div className="listProducts__title">
        <h4>{title.toUpperCase()}</h4>
      </div>
      <div className="listProducts__content">
        <AliceCarousel disableDotsControls={true} responsive={responsive} mouseTracking={true} items={productItems} />
      </div>
    </div>
  );
};
export default ListProducts;
