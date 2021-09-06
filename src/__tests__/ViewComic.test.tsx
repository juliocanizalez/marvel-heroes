/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import store from '../store/store';
import { renderWithRouter } from '../tests/utils';
import ViewComicPage from '../containers/Comics/ViewComic';

describe('Test on ViewComicPage component', () => {
  test('should render component correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewComicPage />
      </Provider>,
      { route: '/comics/1' },
    );

    await waitFor(
      () => {
        expect(container.querySelector('.image-header-title')).not.toBeNull();
        expect(container).toMatchSnapshot();
      },
      { timeout: 2500 },
    );
  });
});
