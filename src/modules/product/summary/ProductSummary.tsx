import React from 'react';
import './ProductSummary.scss';
import productImage from 'assets/images/images-removebg.png';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { ProductSummaryProps } from '../ProductWrapper.d';
import { useTranslation } from 'react-i18next';
import Quantity from 'components/quantity/Quantity';
import { Button } from 'reactstrap';
const ProductSummary: React.FC<ProductSummaryProps> = ({
  setQuantity,
  quantity,
  price,
  priceDiscount,
  label,
  model,
  image,
  name,
  origin
}) => {
  const { t } = useTranslation();

  const updatedPrice = price ? (
    <div>
      {priceDiscount ? (
        <>
          <span className="priceBefore price">
            <del>
              {new Intl.NumberFormat().format(price)}
              <u>
                <sup>đ</sup>
              </u>
            </del>
          </span>
          <span className="currentPrice price">
            {new Intl.NumberFormat().format(priceDiscount)}
            <u>
              <sup>đ</sup>
            </u>
          </span>
        </>
      ) : (
        <span className="currentPrice price">
          {new Intl.NumberFormat().format(price)}
          <u>
            <sup>đ</sup>
          </u>
        </span>
      )}
    </div>
  ) : (
    <span className="currentPrice price">{t('LIEN_HE')}</span>
  );
  const information = [
    {
      title: t('NHAN_HIEU'),
      content: label
    },
    {
      title: t('XUAT_XU'),
      content: origin
    },
    {
      title: t('MODEL'),
      content: model
    }
  ];
  const renderProductInformation = () => {
    return information.map(
      (item: { title: string; content?: string }) =>
        item.content && (
          <p className="information">
            <span className="information__title">{`${item.title}:`}</span>
            <span className="information__content">{item.content}</span>
          </p>
        )
    );
  };
  return (
    <div className="productSummary">
      <div className="container">
        <div className="row productSummary__content">
          <div className="col-md-5 left">
            <div className="productSummary__img">
              <img src={image ? image : productImage} alt="product" />
              <div className="icon__animation headerIcon">
                <AiOutlineHeart />
              </div>
            </div>
          </div>
          <div className="col-md-7 right">
            <h4>{name}</h4>
            <p>{updatedPrice}</p>
            {renderProductInformation()}
            <div className="specification">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore minima eius quaerat enim corporis
                fugit ratione deserunt facilis sapiente quos repellat quam sunt eum tempora recusandae vel, rem culpa
                facere aperiam dolorem totam eos aut, . Saepe repudiandae nesciunt ducimus non, id voluptatem facilis
                eligendi. Incidunt cupiditate nobis quisquam.{' '}
              </p>
              <ul>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, accusantium?</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, accusantium?</li>
                <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, accusantium?</li>
              </ul>
            </div>
            <div className="cart">
              <Quantity defaultNumber={quantity} setValue={setQuantity} />
              <Button>
                <span>
                  <AiOutlineShoppingCart />
                  {t('THEM_VAO_GIO_HANG')}
                </span>{' '}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductSummary;
