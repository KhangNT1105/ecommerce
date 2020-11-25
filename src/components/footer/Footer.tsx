import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';

const Footer: React.FC = React.memo(() => {
  const { t } = useTranslation();
  return <div className="footer">{t('COPYRIGHT')}</div>;
});

export default Footer;
