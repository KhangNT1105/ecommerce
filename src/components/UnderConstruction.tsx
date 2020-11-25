import React from 'react';
import { useTranslation } from 'react-i18next';

const UnderConstruction: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 900,
        height: '100%',
        color: '#777986',
        minHeight: '40vh'
      }}
    >
      {t('UNDER_CONSTRUCTION')}
    </div>
  );
};

export default UnderConstruction;
