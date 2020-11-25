import { testSnapshots } from '../../utils/test';
import CurrencyInput from './CurrencyInput';

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

describe('<CurrencyInput />', () => {
  testSnapshots(CurrencyInput, [
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        name: 'test'
      },
      description: 'render input correctly'
    },
    {
      props: {
        name: 'test',
        currency: 'test label'
      },
      description: 'render label correctly'
    }
  ]);
});
