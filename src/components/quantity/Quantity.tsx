import React, { useEffect, useRef, useState } from 'react';
import './Quantity.scss';
import { QuantityProps } from './Quantity.d';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
const Quantity: React.FC<QuantityProps> = ({ setValue, key, defaultNumber = 0, setFieldValue }) => {
  const isFirstRender = useRef<boolean>(true);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    setQuantity(defaultNumber);
  }, [defaultNumber]);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      key && setFieldValue && setFieldValue(key, quantity);
      setValue && setValue(quantity);
    }
    // eslint-disable-next-line
  }, [quantity]);
  const handleChangeQuantity = (isCountUp: boolean = true) => {
    if (!isCountUp && quantity === 0) return;
    setQuantity(quantity + (isCountUp ? 1 : -1));
  };
  return (
    <div className="quantity">
      <div className="quantity__content">
        <div className="icon" onClick={() => handleChangeQuantity(false)}>
          <IoMdArrowDropleft />
        </div>
        <span>{quantity}</span>
        <div className="icon" onClick={() => handleChangeQuantity(true)}>
          <IoMdArrowDropright />
        </div>
      </div>
    </div>
  );
};
export default Quantity;
