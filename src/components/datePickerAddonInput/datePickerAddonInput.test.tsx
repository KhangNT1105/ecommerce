import { testSnapshots } from '../../utils/test';
import DatePickerAddonInput from './datePickerAddonInput';

describe('<DatePickerAddonInput />', () => {
  testSnapshots(DatePickerAddonInput, [
    {
      props: {},
      description: 'default render'
    }
  ]);
});
