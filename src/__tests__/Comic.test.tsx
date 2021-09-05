/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */

/* eslint-disable */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import store from '../store/store';
import Comics from '../containers/Comics/Comics';

describe('Test on Comics', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>,
    );
    await waitFor(
      () => {
        expect(container.querySelector('.cards')).not.toBeNull();
        expect(container.querySelector('.loading')).toBeNull();
        expect(container).toMatchSnapshot();
      },
      { timeout: 2500 },
    );
  });

  test('should show typed title on input', async () => {
    const search = 'x-men';
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>,
    );

    userEvent.type(screen.getByPlaceholderText(/Comic's title/i), search);
    expect((screen.getByPlaceholderText(/Comic's title/i) as HTMLInputElement).value).toBe(search);
  });
});
