import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import ErrorMessage from './ErrorMessage';

const toggle = jest.fn();
const confirmDeleteItem = jest.fn();

describe('ErrorMessage component testing...', () => {
  test('renders message info', () => {
    const title = 'Error';
    const message = 'Something is wrong!!!';
    const { asFragment } = render(
      <ErrorMessage isOpen={true} title={title} message={message} onCancelHandler={toggle} />
    );

    expect(screen.getByText(title).textContent).toEqual(title);

    expect(asFragment()).toMatchSnapshot();
  });
});
