import { testSnapshots } from '../../utils/test';
import TermAndConditions from './TermAndConditions';

describe('TermAndConditions Page', () => {
  testSnapshots(TermAndConditions, [
    {
      props: {},
      description: 'render TermAndConditions Page'
    }
  ]);
});
