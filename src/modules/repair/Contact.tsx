import React from 'react';
import { useTranslation } from 'react-i18next';
import { StrengthPointValues } from './Repair.d';
import '../home/highlight/HomeHighlight.scss';
import callIcon from 'assets/images/highlight/call.svg';
import shippingIcon from 'assets/images/highlight/shipped.svg';
import messageIcon from 'assets/images/highlight/message.svg';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const strengthPoints: StrengthPointValues[] = [
    {
      title: t('DIA_CHI'),
      subtitle: t('DIA_CHI_DETAILS'),
      icon: shippingIcon
    },
    {
      title: t('DIEN_THOAI'),
      subtitle: t('SDT'),
      icon: callIcon
    },
    {
      title: t('EMAIL_LABEL'),
      subtitle: t('EMAIL_DETAILS'),
      icon: messageIcon
    }
  ];
  const renderStrengthPoints = (strengthPoints: StrengthPointValues[]) => {
    return strengthPoints.map((strengthPoint: StrengthPointValues, index: number) => (
      <div className="col-md-4" key={`${strengthPoint.title}-${index}`}>
        <div className="strengthPoint item">
          <div className="strengthPoint__icon">
            <img src={strengthPoint.icon} alt="strength point icon" />
          </div>
          <div className="strengthPoint__text">
            <h5 className="strengthPoint__title">{strengthPoint.title}</h5>
            <span className="strengthPoint__subtitle">{strengthPoint.subtitle} </span>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div className="homeHighlight">
      <div className="container">
        <div className="row homeHighlight__strengthPoints">{renderStrengthPoints(strengthPoints)}</div>
      </div>
    </div>
  );
};
export default Contact;
