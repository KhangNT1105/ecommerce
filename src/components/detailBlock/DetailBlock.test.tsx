import { testSnapshots } from '../../utils/test';
import DetailBlock from './DetailBlock';

describe('component Detail Block', () => {
  testSnapshots(DetailBlock, [
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        blockTitle: 'Text'
      },
      description: 'render with props block Title'
    }
  ]);
});
