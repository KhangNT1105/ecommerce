import React from 'react';
import './ProductSpecification.scss';
import productImage from 'assets/images/products/product.png';
const ProductSpecification: React.FC = () => {
  return (
    <div className="productSpecification">
      <div className="row productSpecification__content">
        <div className="col-md-6 text">
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta vero beatae, maiores voluptatem molestias
            necessitatibus debitis consequatur sit impedit dolorem magnam ab veritatis error magni quia ad iure
            exercitationem assumenda accusamus fuga fugit. Excepturi, est amet fugit reiciendis maiores voluptatum
            reprehenderit labore laudantium accusamus dolore quo eligendi error, minus beatae.
          </p>
        </div>
        <div className="col-md-6 image">
          <div className="productSpecification__img">
            <img src={productImage} alt="product" />
          </div>
        </div>
        <div className="col-md-6 image">
          <div className="productSpecification__img">
            <img src={productImage} alt="product" />
          </div>
        </div>
        <div className="col-md-6 text">
          <h2>Lorem ipsum dolor sit amet.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta vero beatae, maiores voluptatem molestias
            necessitatibus debitis consequatur sit impedit dolorem magnam ab veritatis error magni quia ad iure
            exercitationem assumenda accusamus fuga fugit. Excepturi, est amet fugit reiciendis maiores voluptatum
            reprehenderit labore laudantium accusamus dolore quo eligendi error, minus beatae.
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductSpecification;
