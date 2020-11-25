import React from 'react';
import { mount } from 'enzyme';
import { testSnapshots } from '../../utils/test';

import { EXPORT_FILE_TYPE, TOAST_TYPE, POSITION } from '../../constants/enum';
import CONFIG from '../../config';

import ExportButton from './ExportButton';

describe('Export Button Component testing...', () => {
  testSnapshots(ExportButton, [
    {
      props: {
        type: EXPORT_FILE_TYPE.CSV,
        apiUrl: CONFIG.API.EXPORT_SERVICE
      },
      description: 'Export to CSV file with mock server api'
    },
    {
      props: {
        type: EXPORT_FILE_TYPE.XLS,
        apiUrl: CONFIG.API.EXPORT_SERVICE
      },
      description: 'Export to XLS file mock server api'
    }
  ]);
});
