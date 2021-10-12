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
import { PersistGate } from 'redux-persist/integration/react';
import Cellcart from '../containers/Cellcart';
import linkpersistedstore from '../reducers/store';
import App from '../App';
import items from './res/items.json';

let store; let
  persistor;

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
  persistor = a.persistor;
  cleanup();
});
afterAll(() => server.close());

test('Assert Cellcart should not render anything else than integers', async () => {
  const shopcarttitems = ['#'];
  const bookcarttitems = ['A'];
  expect(() => {
    render(
      <Provider store={store}>
        <Cellcart bookcart={bookcarttitems} shopcart={shopcarttitems} />
      </Provider>,
    );
  }).toThrowError();

  cleanup();

  const history = createMemoryHistory();
  history.push('shop');

  await act(async () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <App />
          </Router>
        </PersistGate>
      </Provider>,
    );
    await waitFor(() => screen.getAllByTestId('Cellitemdisplay_addtocartbtn'));
    fireEvent.click(screen.queryAllByTestId('Cellitemdisplay_addtocartbtn')[0]);

    expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(1);
  });
});

test('Assert Cellcart displays assigned bookcart items', async () => {
  const bookcartitems = [0];
  const history = createMemoryHistory();
  await act(async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Cellcart bookcart={bookcartitems} shopcart={[]} />
        </Router>
      </Provider>,
    );
  });

  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay'));

  expect((await screen.findByTestId('Bookwrappedrowlist')).children[0].children).toHaveLength(1);
});

test('Assert Cellcart displays assigned shopcart items', async () => {
  const shopcarttitems = [0];
  await act(async () => {
    render(
      <Provider store={store}>
        <Cellcart bookcart={[]} shopcart={shopcarttitems} />
      </Provider>,
    );
  });

  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay'));

  expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(1);
});

test('Assert Cellcart displays both assigned shopcart and bookcart items', async () => {
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
  fireEvent.click(screen.getAllByTestId('Cellitemdisplay_addtocartbtn')[0]);
  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay'));

  history.push('book');
  await waitFor(() => screen.getAllByTestId('Cellitemdisplay_checkbtn'));
  fireEvent.click(screen.getAllByTestId('Cellitemdisplay_checkbtn')[0]);
  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay'));

  expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(1);
  expect((await screen.findByTestId('Bookwrappedrowlist')).children[0].children).toHaveLength(1);
});

test('Assert Cellcart should removes items onClick event', async () => {
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

  //  Cellitemdisplay_checkbtn
  await waitFor(() => screen.getAllByTestId('Cellitemdisplay'));
  await waitFor(() => screen.getAllByTestId('Cellitemdisplay_addtocartbtn'));
  fireEvent.click(screen.getAllByTestId('Cellitemdisplay_addtocartbtn')[0]);
  fireEvent.click(screen.getAllByTestId('Cellitemdisplay_addtocartbtn')[1]);
  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay'));
  await waitFor(() => screen.getAllByTestId('Rowitemcartdisplay_removebtn'));
  fireEvent.click(screen.getAllByTestId('Rowitemcartdisplay_removebtn')[0]);
  fireEvent.click(screen.getAllByTestId('Rowitemcartdisplay_removebtn')[1]);

  expect((await screen.findByTestId('Shopwrappedrowlist')).children[0].children).toHaveLength(0);
  expect((await screen.findByTestId('Bookwrappedrowlist')).children[0].children).toHaveLength(0);
});

// FIRE EVENTS SAMPLE
// userEvent.type(screen.getByTestId('Rowsearchinput'), 'A');
// fireEvent.keyDown(screen.getByTestId('Rowsearchinput'), { key: 'Enter', code: 'Enter' });
