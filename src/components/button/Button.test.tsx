import { testSnapshots } from '../../utils/test';
import Button from './Button';

describe('component Button', () => {
  testSnapshots(Button, [
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        children: 'Text'
      },
      description: 'render with children'
    },
    {
      props: {
        disabled: true
      },
      description: 'render disabled'
    }
  ]);
});
