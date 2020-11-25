import { testSnapshots } from '../../utils/test';
import IconEdit from './IconEdit';

describe('component Button', () => {
  testSnapshots(IconEdit, [
    {
      props: {
        enabled: false,
        onClick: jest.fn()
      },
      description: 'render icon-edit-button-disabled'
    },
    {
      props: {
        enabled: true,
        onClick: jest.fn()
      },
      description: 'render icon-edit-button'
    }
  ]);
});
