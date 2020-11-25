import { testSnapshots } from '../../utils/test';
import EditorCardCustom from './EditorCardCustom';

describe('<EditorCardCustom />', () => {
  testSnapshots(EditorCardCustom, [
    {
      props: {
        children: ''
      },
      description: 'default render'
    },
    {
      props: {
        type: 'text',
        color: 'blue',
        className: 'editorCardCustom',
        children: 'Editor Card Custom'
      },
      description: 'render with props'
    }
  ]);
});
