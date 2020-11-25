import React from 'react';
import './Product.scss';
import { ProductProps } from './Product.d';
import { TiStarOutline } from 'react-icons/ti';

import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import DefaultProductImage from 'assets/images/products/product.png';
import RoutesString from 'pages/routesString';
const Product: React.FC<ProductProps> = ({ product, handleAddToCart }) => {
  const handleDragStart = (e: any) => e.preventDefault();
  const { t } = useTranslation();
  const route = RoutesString.Product.replace(':id', product._id.toString());

  const updatedPrice = product.price ? (
    <div>
      {product.priceDiscount ? (
        <>
          <span className="priceBefore price">
            <del>
              {new Intl.NumberFormat().format(product.price)}
              <u>
                <sup>đ</sup>
              </u>
            </del>
          </span>
          <span className="currentPrice price">
            {new Intl.NumberFormat().format(product.priceDiscount)}
            <u>
              <sup>đ</sup>
            </u>
          </span>
        </>
      ) : (
        <span className="currentPrice price">
          {new Intl.NumberFormat().format(product.price)}
          <u>
            <sup>đ</sup>
          </u>
        </span>
      )}
    </div>
  ) : (
    <span className="currentPrice price">{t('LIEN_HE')}</span>
  );
  const renderStars = () => {
    return Array(5)
      .fill(TiStarOutline)
      .map((Item: any, index: number) => <Item key={index} />);
  };
  return (
    <div className="product">
      <Card>
        <div className="card__img">
          <Link to={route}>
            <CardImg
              loading="lazy"
              onDragStart={handleDragStart}
              top={true}
              width="100%"
              src={product.image || DefaultProductImage}
              alt="Card image cap"
            />
          </Link>
        </div>
        <CardBody>
          <CardText>{renderStars()} </CardText>
          <CardTitle tag="h5">
            <Link to={route} className="text__animation">
              {product.name}
            </Link>
          </CardTitle>
          <CardText className="price">{updatedPrice}</CardText>
        </CardBody>
        <div className="card__bottom">
          <AiOutlineHeart className="text__animation" />
          <AiOutlineSearch className="text__animation" />
          <AiOutlineShoppingCart className="text__animation" onClick={() => handleAddToCart(product)} />
        </div>
      </Card>
    </div>
  );
};
export default Product;
