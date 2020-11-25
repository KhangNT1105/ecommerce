import { testSnapshots } from '../../utils/test';
import { DropdownSection } from './DropdownSection';

describe('component Button', () => {
  testSnapshots(DropdownSection, [
    {
      props: {},
      description: 'default render'
    },
    {
      props: {
        className: 'dropdown',
        list: 'list',
        children: 'Test Dropdown Section'
      },
      description: 'render with props className and list'
    },
    {
      props: {
        className: 'dropdown',
        children: 'Test Dropdown Section'
      },
      description: 'render with props className and no list'
    }
  ]);
});
