import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { EXPORT_FILE_TYPE, TOAST_TYPE, POSITION } from '../../constants/enum';
import { EXPORT_TYPE } from '../../constants/types';
import CONFIG from '../../config';

import Toast from '../../components/toast/Toast';
import ExportButton from './ExportButton';
import { RespType } from './ExportButton.d';

// init
const initialState: RespType = {
  error: false,
  msg: ''
};
type DemoProps = {
  type: EXPORT_TYPE;
};

const Demo = (props: DemoProps) => {
  const { type } = props;

  const [exportMessage, setExportMessage] = useState(initialState.msg);
  const [exportError, setExportError] = useState(initialState.error);

  const handleExport = (resp: RespType) => {
    setExportError(resp.error);
    setExportMessage(resp.msg);
  };

  const handleClose = () => {
    setExportMessage('');
  };

  return (
    <div>
      <ExportButton size="sm" apiUrl={CONFIG.API.EXPORT_SERVICE} exportType={type} handleExport={handleExport}>
        Export
      </ExportButton>
      <p>
        <em>Note: Mock server must be start.</em>
      </p>
      {exportMessage !== '' && (
        <Toast
          message={exportMessage}
          type={exportError ? TOAST_TYPE.ERROR : TOAST_TYPE.SUCCESS}
          position={POSITION.BOTTOM_RIGHT}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

// Stories
storiesOf('Export component', module)
  .add('Export to CSV with mock server api', () => <Demo type={EXPORT_FILE_TYPE.CSV} />)
  .add('Export to XLS with mock server api', () => <Demo type={EXPORT_FILE_TYPE.XLS} />);
