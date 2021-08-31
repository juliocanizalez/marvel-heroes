/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import store from '../store/store';
import server from '../mocks/server';
import { emptyResponse } from '../mocks/testData';
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

    await waitFor(() => {
      expect(container.querySelector('.cards')).not.toBeNull();
      expect(container).toMatchSnapshot();
    });
  });

  test('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Stories />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.cards')).not.toBeNull();
    });

    userEvent.click(container.querySelector('.btn-bookmark') as Element);

    expect(container.querySelector('.bookmark-selected')).not.toBe(null);

    userEvent.click(container.querySelector('.btn-bookmark') as Element);

    expect(container.querySelector('.bookmark-selected')).toBe(null);
  });

  test('should hide card and show hidden stories message', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Stories />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.cards')).not.toBeNull();
      expect(container.querySelector('.loading-container')).toBeNull();
    });

    userEvent.click(container.querySelector('.btn-hide') as Element);

    expect(container.querySelector('.cards')).toBeNull();
    expect(screen.getByText(/Stories on this page are hidden 🤐/i)).toBeInTheDocument();
  });

  test('should handle no results', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(emptyResponse()));
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Stories />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Stories not found 😮/i)).toBeInTheDocument();
      expect(container.querySelector('.cards')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/stories`, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Stories />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load stories 😓/i)).toBeInTheDocument();
      expect(container.querySelector('.cards')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });
});
