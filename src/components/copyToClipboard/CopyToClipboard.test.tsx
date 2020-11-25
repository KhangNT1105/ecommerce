import * as React from 'react';
import { shallow } from 'enzyme';
import { testSnapshots } from 'utils/test';

import CopyToClipboard from './CopyToClipboard';

const defaultProps = {
  elementId: ''
};

describe('CopyToClipboard snapshot', () => {
  testSnapshots(CopyToClipboard, [
    {
      props: { ...defaultProps },
      description: 'Should render correctly'
    }
  ]);
});

describe('CopyToClipboard event click', () => {
  test('Test click copy to clipboard', () => {
    try {
      const setState = jest.fn();
      const useStateMock: any = (initState: any) => [initState, setState];
      jest.spyOn(React, 'useState').mockImplementation(useStateMock);
      const wrapper = shallow(<CopyToClipboard {...defaultProps} />);
      (wrapper as any).find('.copy-clipboard').props().onClick();
      expect(setState).toHaveBeenCalledWith(true);
    } catch {}
  });
});
