import { testSnapshots } from '../../utils/test';
import BlockItem from './BlockItem';

describe('component BlockItem', () => {
  testSnapshots(BlockItem, [
    {
      props: {
        campaignTitle: 'campaignTitle',
        children: 'test'
      },
      description: 'render snapshot correctly'
    }
  ]);
});
