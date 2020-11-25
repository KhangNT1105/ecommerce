import * as React from 'react';
import { shallow } from 'enzyme';

import RouteLeavingGuard, { handleBeforeUnload } from './routeLeavingGuard';
import { testSnapshots } from '../../utils/test';
import { PAGE_ENTITY } from 'constants/enum';

jest
  .mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: jest.fn()
    }),
    Prompt: () => <div />
  }))
  .mock('components/modal/WarningMessage/WarningMessage', () => 'WarningMessage')
  .mock('stores/AuthenticationStore/authentication', () => () => [
    {
      user: {
        permissions: ['CREATE_LICENSOR', 'VIEW_LICENSOR', 'EDIT_LICENSOR']
      }
    }
  ]);

describe('<RouteLeavingGuard/>', () => {
  const setState = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);
  const wrapper = () => <RouteLeavingGuard when={true} />;

  testSnapshots(wrapper, [
    {
      description: 'render RouteLeavingGuard snapshot',
      props: {
        when: true
      }
    }
  ]);
});

describe('Handlers', () => {
  let wrapper: any;
  let useEffect: any;
  const setState = jest.fn();

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: any) => f());
  };

  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    wrapper = shallow(<RouteLeavingGuard when={true} mode={'/'} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handleCancel to be called', () => {
    const WarningMessage: any = wrapper.find('WarningMessage').props();
    WarningMessage.onCancelHandler();
    expect(setState).toHaveBeenCalledWith(false);
  });
  test('handleOk to be called', () => {
    const WarningMessage: any = wrapper.find('WarningMessage').props();
    WarningMessage.onOkHandler();
    expect(setState).toHaveBeenCalledWith(false);
    expect(setState).toHaveBeenCalledWith(true);
  });
  test('handleBlockedNavigation to be called with showing popup', () => {
    const event: any = {
      preventDefault: jest.fn(),
      returnValue: ''
    };
    handleBeforeUnload(event);

    const Prompt: any = wrapper.find('Prompt').props();
    Prompt.message('/login');
  });
});
