import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const PageNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="fullscreen anonymous-layout">
      <div className="fullscreen__section fullscreen__section--center">
        <div className="mb-4 error-cant-found">
          <div className="mb-4 text-center">
            <div className="mb-4 text-center">
              <i className="fa fa-close fa-3x text-danger" />
            </div>
            <h5 className="text-center mb-4">{t('ERROR.404')}</h5>
            <div className="text-center">
              <Link to="/" className="text-decoration-none">
                <i className="fa fa-angle-left mr-2" />
                <span>{t('ACCESS_DENIED_CTA')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
