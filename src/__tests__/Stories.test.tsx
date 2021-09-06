/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../store/store';
import Stories from '../containers/Stories/Stories';

describe('Test on ListStoriesPage', () => {
  test('Should render component correctly', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Stories />
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
});
