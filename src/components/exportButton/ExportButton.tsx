import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import exportFromJSON from 'export-from-json';
import API from '../../api';

import { COLOR } from '../../constants/enum';
import Button from '../button/Button';

import { StateType, Props } from './ExportButton.d';

// init
const initialState: StateType = {
  exportNow: false,
  exportData: []
};

// Component
const ExportButton: React.FC<Props> = ({
  children,
  color,
  outline,
  size,
  disabled,
  type,
  handleExport,

  apiUrl,
  exportType
}) => {
  // default props
  const { t } = useTranslation();

  // methods

  // handle event
  const handleButtonExport = () => {
    setExportNow(true);
  };

  // states
  const [exportNow, setExportNow] = useState(initialState.exportNow);
  const [exportData, setExportData] = useState(initialState.exportData);

  // effects
  useEffect(() => {
    if (exportNow) {
      const fetchData = async () => {
        try {
          const { data } = await API({ url: apiUrl });
          if (data) {
            setExportData(data);
          }
        } catch (e) {
          if (handleExport) {
            handleExport({
              error: true,
              msg: t('SERVER_NOT_RESPONSE')
            });
          }
        }
      };
      fetchData();
    }
  }, [exportNow, handleExport, t, apiUrl]);
  useEffect(() => {
    if (exportNow && exportData.length) {
      if (handleExport) {
        try {
          const fileName = `${exportType}_exported`;
          exportFromJSON({
            data: exportData,
            fileName,
            exportType
          });

          handleExport({
            error: false,
            msg: t('EXPORT_SUCCESS')
          });
        } catch (e) {
          handleExport({
            error: true,
            msg: t('EXPORT_FAILED')
          });
        }
      }
      setExportNow(false);
    }
  }, [exportNow, exportData, handleExport, t, exportType]);

  // render
  return (
    <Button
      type={type}
      color={color || COLOR.PRIMARY}
      size={size || ''}
      disabled={exportNow}
      outline={outline || false}
      onClick={handleButtonExport}
    >
      {exportNow ? t('EXPORTING') : children}
    </Button>
  );
};

export default ExportButton;
