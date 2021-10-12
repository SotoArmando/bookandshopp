import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  render, waitFor, screen, fireEvent, cleanup,
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

test('Assert Pagehomepath should display 10 items from presaved state', async () => {
  const history = createMemoryHistory();
  history.push('shop');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });

  await waitFor(() => screen.getAllByTestId('Cellitemdisplay'));

  expect((await screen.findByTestId('Pagehomepathwrappedrowlist')).children[0].children).toHaveLength(10);
});

test('Assert Pagehomepath should display Preview onClick', async () => {
  const history = createMemoryHistory();
  history.push('shop');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });

  await waitFor(() => screen.getAllByTestId('Cellitemdisplay'));
  fireEvent.click(screen.getAllByTestId('Cellitemdisplay_previewtbtn')[0]);
  expect(await screen.findByTestId('Pageitempreview')).toBeInTheDocument();
});

test('Assert Pagehomepath should display Preview on url preview/:id', async () => {
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

  expect(await screen.findByTestId('Pageitempreview')).toBeInTheDocument();
});

test('Assert Pagehomepath should display Preview on url preview/:id but not allow anything than numbers', async () => {
  const history = createMemoryHistory();
  history.push('preview/abasdasd');
  expect(() => render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  )).toThrowError();
});

test('Assert Pagehomepath should add to cart', async () => {
  const history = createMemoryHistory();
  history.push('shop');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });
  await waitFor(() => screen.getAllByTestId('Cellitemdisplay_addtocartbtn'));
  fireEvent.click(screen.queryAllByTestId('Cellitemdisplay_addtocartbtn')[0]);

  expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(1);
});

test('Assert Pagehomepath should add to cart only id number references', async () => {
  const history = createMemoryHistory();
  history.push('shop');

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    await waitFor(() => screen.getAllByTestId('Cellitemdisplay_addtocartbtn'));
  });
  fireEvent.click(screen.queryAllByTestId('Cellitemdisplay_addtocartbtn')[9]);
  expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(0);
});

test('Assert Pagehomepath should add to booking cart', async () => {
  const history = createMemoryHistory();
  history.push('book');
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
  });
  await waitFor(() => screen.getAllByTestId('Cellitemdisplay_checkbtn'));
  fireEvent.click(screen.queryAllByTestId('Cellitemdisplay_checkbtn')[0]);

  expect((await screen.findByTestId('Bookwrappedrowlist')).children[0].children).toHaveLength(1);
});

test('Assert Pagehomepath should add to booking cart only id number references', async () => {
  const history = createMemoryHistory();
  history.push('book');

  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    await waitFor(() => screen.getAllByTestId('Cellitemdisplay_checkbtn'));
  });
  fireEvent.click(screen.queryAllByTestId('Cellitemdisplay_checkbtn')[9]);
  expect((await screen.findByTestId('Bookwrappedrowlist')).children[0].children).toHaveLength(0);
});
