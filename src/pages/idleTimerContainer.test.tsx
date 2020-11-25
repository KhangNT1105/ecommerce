import { testSnapshots } from '../utils/test';
import IdleTimerContainer from './idleTimerContainer';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));
describe('<IdleTimerContainer />', () => {
  testSnapshots(IdleTimerContainer, [
    {
      description: 'Render IdleTimerContainer component',
      props: {
        history: jest.fn()
      }
    }
  ]);
});
