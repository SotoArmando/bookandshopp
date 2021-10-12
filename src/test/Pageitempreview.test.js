import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import linkpersistedstore from '../reducers/store';
import App from '../App';
import items from './res/items.json';

let store;
const server = setupServer(
  rest.get('https://bookandshoprails.herokuapp.com/items', (req, res, ctx) => res(ctx.json(items))),
  rest.get('https://bookandshoprails.herokuapp.com/items/0', (req, res, ctx) => res(ctx.json(items[0]))),
  rest.get('https://bookandshoprails.herokuapp.com/items/1', (req, res, ctx) => res(ctx.json(items[1]))),
  rest.get('https://bookandshoprails.herokuapp.com/items/2', (req, res, ctx) => res(ctx.json(items[2]))),
);

beforeAll(() => server.listen());
beforeEach(() => {
  server.resetHandlers();
  const a = linkpersistedstore();
  store = a.store;

  cleanup();
});
afterAll(() => server.close());

test('Assert Pageitempreview should display the preview on route preview/:id', async () => {
  const history = createMemoryHistory();
  history.push('preview/1');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });

  await waitFor(() => screen.getByTestId('Pageitempreview'));
  expect(screen.getByTestId('Pageitempreview')).toBeInTheDocument();
});

test('Assert Pageitempreview should display the preview on route preview/:id using only number references', async () => {
  const history = createMemoryHistory();
  history.push('preview/qwdqwd1');
  expect(() => render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  )).toThrowError();
});

test('Assert Pageitempreview should display the picture related to the refence id', async () => {
  const history = createMemoryHistory();
  history.push('preview/1');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });

  await waitFor(() => screen.getByTestId('Pageitempreview'));
  await waitFor(() => expect(screen.getByTestId('Pageitempreview').children[0]).toHaveStyle('background-image: url(https://bookandshoprails.herokuapp.com/res/5568.jpeg)'));
  expect(screen.getByTestId('Pageitempreview').children[0]).toHaveStyle('background-image: url(https://bookandshoprails.herokuapp.com/res/5568.jpeg)');
});
