import { testSnapshots } from '../../../utils/test';
import SideBarBottom from './SideBarBottom';

describe('<SideBarBottom />', () => {
  testSnapshots(SideBarBottom, [
    {
      props: {
        text: 'side bar bottom'
      },
      description: 'default render'
    }
  ]);
});
