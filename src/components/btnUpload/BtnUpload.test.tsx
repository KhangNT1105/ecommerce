import BtnUpload from './BtnUpload';
import { testSnapshots } from '../../utils/test';

describe('<BreadCrumb />', () => {
  testSnapshots(BtnUpload, [
    {
      props: {
        handleUpload: jest.fn()
      },
      description: 'default render'
    }
  ]);
});
