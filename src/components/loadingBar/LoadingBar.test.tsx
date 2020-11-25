import { testSnapshots } from '../../utils/test';
import LoadingBar from './LoadingBar';

describe('<LoadingBar />', () => {
  testSnapshots(LoadingBar, [
    {
      props: {
        children: 'Loading ...'
      },
      description: 'render snapshot correctly'
    }
  ]);
});
