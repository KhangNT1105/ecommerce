import { testSnapshots } from '../../utils/test';
import ImageThumbnail from './ImageThumbnail';

describe('<SearchBox />', () => {
  testSnapshots(ImageThumbnail, [
    {
      props: {},
      description: 'Should Render default Image'
    }
  ]);
});
