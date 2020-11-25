import { testSnapshots } from '../../../utils/test';
import CustomInputField from 'components/field/CustomInputField/CustomInputField';

jest.mock('formik', () => ({
  useField: (name: string) => {
    return [null, { value: 'Test value' }, { setValue: jest.fn() }];
  }
}));

describe('<CustomInputField />', () => {
  testSnapshots(CustomInputField, [
    {
      props: {
        component: 'input',
        id: 'render_custom_checkbox',
        key: 'render_custom_checkbox',
        label: 'Custom Input',
        name: 'test',
        type: 'checkbox',
        invalid: false,
        onChange: jest.fn(),
        touched: false,
        errorText: '',
        disabled: false
      },
      description: 'default render'
    },
    {
      props: {
        component: 'input',
        id: 'render_custom_checkbox',
        key: 'render_custom_checkbox',
        label: 'Custom Input',
        name: 'test',
        type: 'checkbox',
        invalid: true,
        onChange: jest.fn(),
        touched: true,
        errorText: 'field is required',
        disabled: false
      },
      description: 'render show error text while only touched or processing handle change'
    }
  ]);
});
