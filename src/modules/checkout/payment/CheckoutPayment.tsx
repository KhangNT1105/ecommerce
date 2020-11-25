import React, { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomInput } from 'reactstrap';
import { CheckoutPaymentProps } from '../CheckoutWrapper.d';
import './CheckoutPayment.scss';

const CheckoutPayment: React.FC<CheckoutPaymentProps> = ({ setPaymentType }) => {
  const { t } = useTranslation();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPaymentType(value);
  };
  useEffect(() => {
    setPaymentType('Thanh toán tại nhà');
    // eslint-disable-next-line
  }, []);
  return (
    <div className="checkoutPayment">
      <h1>{t('CHON_HINH_THUC_THANH_TOAN')} </h1>
      <div className="checkoutPayment__radioButton">
        <CustomInput
          onChange={handleChange}
          type="radio"
          checked={true}
          name="payments"
          id="paymentOnDeliveryId"
          value="Thanh toán tại nhà"
          label={t('THANH_TOAN_KHI_NHAN_HANG')}
        />
        <CustomInput
          onChange={handleChange}
          type="radio"
          name="payments"
          id="paymentOnBankId"
          value="Thanh toán bằng tài khoản ngân hàng"
          label={t('THANH_TOAN_BANG_TAI_KHOAN_NGAN_HANG')}
        />
      </div>
    </div>
  );
};
export default CheckoutPayment;
