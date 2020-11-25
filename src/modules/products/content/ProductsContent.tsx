import React, { useEffect, useRef } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import './ProductsContent.scss';
import { useTranslation } from 'react-i18next';
import Product2 from 'components/product2/Product2';
import Paginations from 'components/pagination/Paginations';
import useProduct from 'stores/ProductStore/productStore';
import SearchBox from 'components/searchBox/SearchBox';
import { SIZE } from 'constants/enum';
import { SORT_PRODUCT } from 'constants/index';
import LoadingBar from 'components/loadingBar/LoadingBar';
import { ProductValue } from 'stores/ProductStore/productStore.d';
import useCart from 'stores/CartStore/cartStore';

const ProductsContent: React.FC = () => {
  const { t } = useTranslation();
  const [stateProduct, action] = useProduct();
  const [, cartActions] = useCart();
  const resultsRef: any = useRef();

  useEffect(() => {
    if (resultsRef.current) {
      window.scrollTo({
        behavior: 'smooth',
        top: resultsRef.current.offsetTop
      });
    }
  }, [stateProduct.isLoading]);

  const categories = [
    {
      title: 'Tất cả sản phẩm',
      _id: ''
    },
    {
      title: 'Máy cân mực laser',
      _id: '5fa901db20326a04be4b4136'
    },
    {
      title: 'Máy thuỷ chuẩn',
      _id: '5fa901bc20326a04be4b4135'
    },
    {
      title: 'Máy toàn đạc điện tử',
      _id: '5fa900f320326a04be4b4132'
    },
    {
      title: 'Máy đo khoảng cách cầm tay',
      _id: '5fa9025220326a04be4b4138'
    }
  ];

  useEffect(() => {
    action.getProducts(stateProduct.params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateProduct.params]);

  const handleAddToCart = (product: ProductValue) => {
    cartActions.addProduct(product);
  };
  const handlePagination = (page: number, size: number) => {
    action.setParams({
      ...stateProduct.params,
      page: page > 0 ? page - 1 : 0,
      limit: size
    });
  };

  const handleChangeCategory = (id: string = '') => {
    action.setParams({
      ...stateProduct.params,
      page: 0,
      category: id
    });
  };

  const renderCategories = (categories: any[]) => {
    return categories.map((category: any, index: number) => (
      <li
        key={index + category?.title}
        className={`${stateProduct.params?.category === category?._id ? 'active' : ''} categoryItem`}
        onClick={() => handleChangeCategory(category?._id)}
      >
        {category?.title}{' '}
      </li>
    ));
  };
  const listDropDown = [
    {
      key: SORT_PRODUCT.PRICE_HIGH_TO_LOW,
      title: t('SORT_PRICE_HIGH_TO_LOW')
    },
    {
      key: SORT_PRODUCT.PRICE_LOW_TO_HIGH,
      title: t('SORT_PRICE_LOW_TO_HIGH')
    },
    {
      key: SORT_PRODUCT.NEW_PRODUCT,
      title: t('SORT_NEW_PRODUCT')
    },
    {
      key: SORT_PRODUCT.OLD_PRODUCT,
      title: t('SORT_OLD_PRODUCT')
    }
  ];
  const onSelectDropDown = (key: string) => {
    switch (key) {
      case SORT_PRODUCT.PRICE_HIGH_TO_LOW:
        action.setParams({
          ...stateProduct.params,
          sort: 'priceDiscount,DESC'
        });
        break;
      case SORT_PRODUCT.PRICE_LOW_TO_HIGH:
        action.setParams({
          ...stateProduct.params,
          sort: 'priceDiscount,ASC'
        });
        break;
      case SORT_PRODUCT.NEW_PRODUCT:
        action.setParams({
          ...stateProduct.params,
          sort: 'createdAt,DESC'
        });
        break;
      case SORT_PRODUCT.OLD_PRODUCT:
        action.setParams({
          ...stateProduct.params,
          sort: 'createdAt,ASC'
        });
        break;

      default:
        break;
    }
  };
  const inputProps = {
    name: 'search-box',
    placeholder: `${t('SEARCH_PRODUCT_PLACEHOLDER')}`,
    inputType: 'text' as 'text',
    autoSubmitAfterTime: 600
  };

  const renderProducts = (products: ProductValue[]) => {
    if (products.length <= 0) {
      return <div className="col-md-4">{t('NO_DATA')}</div>;
    }
    return products.map((product: ProductValue, index: number) => (
      <div className="col-md-4" key={`${product._id}-${index}`}>
        <Product2 product={product} handleAddToCart={handleAddToCart} />
      </div>
    ));
  };

  const handleOnSearch = (value: string) => {
    action.setParams({
      ...stateProduct.params,
      search: value
    });
  };
  if (stateProduct.isLoading) {
    return <div className="loading">{stateProduct.isLoading && <LoadingBar />}</div>;
  }
  return (
    <div className="productsContent" ref={resultsRef}>
      <div className="container">
        <div className="productsContent__filter">
          <div className="row">
            <div className="col-md-3 left">
              <SearchBox inputProps={inputProps} onSubmit={handleOnSearch} />
            </div>
            <div className="col-md-9 right">
              <div className="filter">
                <div className="filter__sort">
                  <UncontrolledDropdown>
                    <DropdownToggle caret={true} size={SIZE.LARGE}>
                      {t('SAP_XEP_MAC_DINH')}
                    </DropdownToggle>
                    <DropdownMenu>
                      {listDropDown &&
                        listDropDown.map((item, index) => {
                          return (
                            <DropdownItem key={item?.key + index} onClick={() => onSelectDropDown(item?.key)}>
                              {item?.title}
                            </DropdownItem>
                          );
                        })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="productsContent__listProducts">
          <div className="row listProducts">
            <div className="col-md-3 left">
              <div className="listProducts__filter">
                <h4>{t('DANH_MUC_SAN_PHAM')}</h4>
                <ul className="listProducts__categories">{renderCategories(categories)}</ul>
              </div>
            </div>
            <div className="col-md-9 right">
              <div className="row listProducts__content">
                {renderProducts(stateProduct.listProduct)}
                {stateProduct.listProduct.length > 0 && (
                  <div className="col-md-12">
                    <Paginations totals={stateProduct?.total!} handlePagination={handlePagination} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductsContent;
