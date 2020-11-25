import MockDate from 'mockdate';

import { testSnapshots } from '../../utils/test';
import DatePicker from './DatePicker';

const mockTime = 1586883600000;
MockDate.set(mockTime);

jest.mock('formik', () => ({
  useField: jest
    .fn()
    .mockReturnValue([null, { value: 'Test value' }, { setValue: jest.fn() }])
    .mockReturnValueOnce([null, { value: 'Test value', error: true, touched: true }, { setValue: jest.fn() }])
}));

describe('<DatePicker />', () => {
  testSnapshots(DatePicker, [
    {
      props: {
        name: 'test',
        validate: {
          dateTime: 'field dateTime is required'
        }
      },
      description: 'render with props validate'
    },
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        name: 'test'
      },
      description: 'render with props name'
    },
    {
      props: {
        readOnly: true
      },
      description: 'render with props readOnly'
    }
  ]);
});
