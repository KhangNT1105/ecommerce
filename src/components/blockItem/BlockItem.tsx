import React from 'react';
import { useTranslation } from 'react-i18next';
import './BlockItem.scss';
import { Props } from './BlockItem.d';

const BlockItem: React.FC<Props> = ({ campaignTitle, children }) => {
  const { t } = useTranslation();

  return (
    <div className="tr block-infor">
      <div className="td infor-line title">{t(campaignTitle)}</div>
      {children}
    </div>
  );
};

export default BlockItem;
