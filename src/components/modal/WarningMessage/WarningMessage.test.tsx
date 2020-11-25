import WarningMessage from './WarningMessage';
import { testSnapshots } from 'utils/test';
describe('InfoMessage component testing...', () => {
  testSnapshots(WarningMessage, [
    {
      props: {
        isOpen: false,
        message: 'test',
        title: 'warning',
        textOk: 'Ok',
        textCancel: 'Cancel',
        onOkHandler: jest.fn(),
        onCancelHandler: jest.fn()
      },
      description: 'default render'
    }
  ]);
});
