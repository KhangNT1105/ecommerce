import { testSnapshots } from '../../utils/test';
import { Dropdown } from './Dropdown';

describe('component Button', () => {
  testSnapshots(Dropdown, [
    {
      props: {
        children: ''
      },
      description: 'default render'
    },
    {
      props: {
        className: 'dropdown',
        right: false,
        children: 'Test Dropdown'
      },
      description: 'render with props className and right is false'
    },
    {
      props: {
        className: 'dropdown',
        right: true,
        children: 'Test Dropdown'
      },
      description: 'render with props className and right is true'
    }
  ]);
});
