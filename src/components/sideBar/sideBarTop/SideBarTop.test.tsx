import { testSnapshots } from '../../../utils/test';
import SideBarTop from './SideBarTop';

describe('<SideBarBottom />', () => {
  testSnapshots(SideBarTop, [
    {
      props: {
        userProfile: {
          avatar: 'avatar',
          name: 'John',
          jobTitle: 'Software Engineer'
        }
      },
      description: 'default render'
    }
  ]);
});
