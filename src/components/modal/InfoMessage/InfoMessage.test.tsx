import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import InfoMessage from './InfoMessage';

const toggle = jest.fn();
const confirmDeleteItem = jest.fn();

describe('InfoMessage component testing...', () => {
  test('renders message info', () => {
    const title = 'Information';
    const message = 'Do you want to do this?';
    render(
      <InfoMessage
        isOpen={true}
        title={title}
        message={message}
        onOkHandler={confirmDeleteItem}
        onCancelHandler={toggle}
      />
    );

    expect(screen.getByText(title).textContent).toEqual(title);

    const btnYes = screen.getByText('OK');
    fireEvent.click(btnYes);
    expect(confirmDeleteItem).toBeCalled();
  });
});
