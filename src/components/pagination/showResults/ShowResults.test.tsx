import ShowResults from './ShowResults';
import { testSnapshots } from '../../../utils/test';

const defaultProps = {
  page: 1,
  size: 25
};
describe('<ShowResults />', () => {
  testSnapshots(ShowResults, [
    {
      props: { ...defaultProps },
      description: 'render snapshot correctly'
    },
    {
      props: { ...defaultProps, isShowResults: false },
      description: 'render null when isShowReults is false'
    }
  ]);
});
