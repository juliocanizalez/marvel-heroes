/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import store from '../store/store';
import server from '../mocks/server';
import { emptyResponse } from '../mocks/testData';
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

    await waitFor(() => {
      expect(container.querySelector('.cards')).not.toBeNull();
      expect(container).toMatchSnapshot();
    });
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

  test('should add/remove bookmark', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
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

  test('should hide card and show hidden comics message', async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.cards')).not.toBeNull();
    });

    userEvent.click(container.querySelector('.btn-hide') as Element);

    expect(container.querySelector('.cards')).toBeNull();
    expect(screen.getByText(/Comics on this page are hidden 🤐/i)).toBeInTheDocument();
  });

  test('should handle no results', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/comics`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(emptyResponse()));
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Comics not found 😮/i)).toBeInTheDocument();
      expect(container.querySelector('.cards')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}v1/public/comics`, (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    );

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Comics />
        </MemoryRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load comics 😓/i)).toBeInTheDocument();
      expect(container.querySelector('.cards')).toBeNull();
      expect(container.querySelector('.pagination-options')).toBeNull();
    });
  });
});
