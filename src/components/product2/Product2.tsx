import React from 'react';
import './Product2.scss';
import { TiStarOutline } from 'react-icons/ti';
import defaultProductImage from 'assets/images/products/product.png';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { ProductProps } from 'components/product/Product.d';
import RoutesString from 'pages/routesString';
const Product2: React.FC<ProductProps> = ({ product, handleAddToCart }) => {
  const productStars = null;
  const { t } = useTranslation();
  const handleDragStart = (e: any) => e.preventDefault();
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
  const renderStars = (productStarts: number | null) => {
    if (!productStarts) {
      return Array(5)
        .fill(TiStarOutline)
        .map((Item: any, index: number) => <Item key={index} />);
    }
  };
  return (
    <div className="product2">
      <Card>
        <div className="card__img">
          <Link to={route}>
            <CardImg
              loading="lazy"
              onDragStart={handleDragStart}
              top={true}
              width="100%"
              src={product.image || defaultProductImage}
              alt="Card image cap"
            />
          </Link>
        </div>
        <CardBody>
          <CardTitle tag="h5">
            <Link to={route} className="text__animation">
              {product.name}
            </Link>
          </CardTitle>
          <CardText className="stars">{renderStars(productStars)} </CardText>
          <CardText className="price">{updatedPrice}</CardText>
        </CardBody>
        <div className="card__left">
          <div className="icon favorite">
            <AiOutlineHeart className="text__animation" />
          </div>
          <div className="icon search">
            <AiOutlineSearch className="text__animation" />
          </div>
          <div className="icon cart" onClick={() => handleAddToCart(product)}>
            <AiOutlineShoppingCart className="text__animation" />
          </div>
        </div>
        <div className="card__flag">
          <div className="new">{t('MOI')}</div>
        </div>
      </Card>
    </div>
  );
};
export default Product2;
