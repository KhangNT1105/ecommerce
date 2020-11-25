import { testSnapshots } from '../../utils/test';
import Footer from './Footer';

describe('<Footer />', () => {
  testSnapshots(Footer, [
    {
      props: {},
      description: 'default render'
    }
  ]);
});
