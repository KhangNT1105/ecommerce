import React from 'react';
import { useTranslation } from 'react-i18next';
import { StrengthPointValues } from '../HomePageWrapper.d';
import './HomeHighlight.scss';
import reputationIcon from 'assets/images/highlight/startup.svg';
import shippingIcon from 'assets/images/highlight/shipped.svg';
const HomeHighlight: React.FC = () => {
  const { t } = useTranslation();
  const strengthPoints: StrengthPointValues[] = [
    {
      title: t('UY_TIN_TRACH_NHIEM'),
      subtitle: t('PHU_DE_UY_TIN_TRACH_NHIEM'),
      icon: reputationIcon
    },
    {
      title: t('VAN_CHUYEN_TOAN_QUOC'),
      subtitle: t('PHU_DE_VAN_CHUYEN_TOAN_QUOC'),
      icon: shippingIcon
    }
  ];
  const renderStrengthPoints = (strengthPoints: StrengthPointValues[]) => {
    return strengthPoints.map((strengthPoint: StrengthPointValues, index: number) => (
      <div className="col-md-6 " key={`${strengthPoint.title}-${index}`}>
        <div className="strengthPoint">
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
export default HomeHighlight;
