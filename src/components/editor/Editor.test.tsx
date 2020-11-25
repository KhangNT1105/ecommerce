import { testSnapshots } from '../../utils/test';
import Editor from './Editor';

jest.mock('react-quill');

const defaultProps = {
  content: '',
  format: ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'color'],
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['clean'],
      [{ color: [] }]
    ]
  }
};
describe('<Editor />', () => {
  testSnapshots(Editor, [
    {
      props: { ...defaultProps },
      description: 'default render'
    },
    {
      props: {
        ...defaultProps,
        content:
          'Exercitationem tenetur nihil perspiciatis sunt facilis provident omnis autem. Magni mollitia minus architecto laboriosam autem qui non neque.'
      },
      description: 'render Snapshot correctly without HTML Tag & Style'
    },
    {
      props: {
        ...defaultProps,
        content:
          'Exercitationem tenetur nihil perspiciatis sunt facilis provident omnis autem. Magni mollitia minus architecto laboriosam autem qui non neque.'
      },
      description: 'render Snapshot Correctly With HTLM Tag & Style'
    }
  ]);
});
