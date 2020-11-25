import { testSnapshots } from '../../../utils/test';
import HeaderMessages from './HeaderMessages';

describe('<HeaderMessages />', () => {
  testSnapshots(HeaderMessages, [
    {
      props: {
        messages: [
          {
            avatar: 'avatar',
            username: 'John',
            status: 'Active',
            time: '23/04/2020',
            content: 'content'
          }
        ]
      },
      description: 'render snapshot with messages'
    }
  ]);
});
