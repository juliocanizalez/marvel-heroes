/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect';

import store from '../store/store';
import { renderWithRouter } from '../tests/utils';
import { renderWithCustomHistory } from '../tests/componentUtils';
import server from '../mocks/server';
import ViewCharacterPage from '../containers/Characters/ViewCharacter';

describe('Test in ViewCharacterPage component', () => {
  test('should render component correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(
      () => {
        expect(container.querySelector('.image-header-title')).not.toBeNull();
        expect(container.querySelector('.image-header-title')?.innerHTML).toBe('spiderman');
        expect(container).toMatchSnapshot();
      },
      { timeout: 2500 },
    );
  });

  test('should show comic and story list correctly', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Spiderman Comic/i)).toBeInTheDocument();
    expect(screen.getByText(/Spiderman Story/i)).toBeInTheDocument();
  });

  test('should show extra information buttons', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Learn more about/i)).toBeInTheDocument();
  });

  test('should Add/Remove bookmark', async () => {
    const { container } = renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Add bookmark/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Add bookmark/i));
    expect(screen.getByText(/Remove bookmark/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Remove bookmark/i));
    expect(screen.getByText(/Add bookmark/i)).toBeInTheDocument();
  });

  test('should hide item', async () => {
    const history = createMemoryHistory();
    history.push('/characters');
    history.push('/characters/1');
    const { container } = renderWithCustomHistory(history);

    await waitFor(() => {
      expect(container.querySelector('.image-header-title')).not.toBeNull();
    });

    expect(screen.getByText(/Hide item/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Hide item/i));
    await waitFor(() => {
      expect(screen.getByText(/Search your hero/i)).toBeInTheDocument();
      expect(container.querySelector('.cards')).toBeNull();
      expect(screen.getByText(/Characters on this page are hidden ????/i)).toBeInTheDocument();
    });
  });

  test('should handle api error', async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL}v1/public/characters/:idCharacter`,
        (req, res, ctx) => {
          return res(ctx.status(404));
        },
      ),
    );

    renderWithRouter(
      <Provider store={store}>
        <ViewCharacterPage />
      </Provider>,
      { route: '/characters/1' },
    );

    await waitFor(() => {
      expect(screen.getByText(/Could not load character ????/i)).toBeInTheDocument();
    });
  });
});
