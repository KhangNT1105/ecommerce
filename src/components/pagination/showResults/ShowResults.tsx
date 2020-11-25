import React from 'react';
import { useTranslation } from 'react-i18next';
import { showResultProps } from '../Paginations.d';
import './ShowResults.scss';
const ShowResults: React.FC<showResultProps> = ({ page, size, isShowResults }) => {
  const { t } = useTranslation();
  const renderShowResults = isShowResults ? (
    <div className="show-results">{t('SHOW_RESULTS', { page, size })}</div>
  ) : null;
  return renderShowResults;
};

ShowResults.defaultProps = {
  isShowResults: true
};
export default ShowResults;
