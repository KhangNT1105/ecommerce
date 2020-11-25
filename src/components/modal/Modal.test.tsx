import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('Modal component testing...', () => {
  test('renders modal', () => {
    const props = {
      isOpen: true,
      className: 'modal-add-user',
      closeButton: true,
      header: 'Demo modal',
      footer: false
    };
    const children = <div>Paragraph or Form is Ok.</div>;
    const modal = shallow(<Modal {...props}>{children}</Modal>);
    expect(modal.find('.modal-title').text()).toEqual(props.header);
    expect(modal.find(`.${props.className}`).length).not.toEqual(0);
    expect(modal.contains(children)).toEqual(true);
  });
});
