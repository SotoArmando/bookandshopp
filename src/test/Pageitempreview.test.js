import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
    render, waitFor, screen, fireEvent, cleanup,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Cellcart from '../containers/Cellcart';
import linkpersistedstore from '../reducers/store';
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import App from '../App';
import items from './res/items.json';
import { PersistGate } from 'redux-persist/integration/react';
var store, persistor;

beforeAll(() => server.listen());
beforeEach(() => {
    server.resetHandlers()
    let a = linkpersistedstore();
    store = a.store;
    persistor = a.persistor;
    cleanup();
});
afterAll(() => server.close());

const server = setupServer(
    rest.get('https://bookandshoprails.herokuapp.com/items', (req, res, ctx) => res(ctx.json(items))),
    rest.get('https://bookandshoprails.herokuapp.com/items/0', (req, res, ctx) => res(ctx.json(items[0]))),
    rest.get('https://bookandshoprails.herokuapp.com/items/1', (req, res, ctx) => res(ctx.json(items[1]))),
    rest.get('https://bookandshoprails.herokuapp.com/items/2', (req, res, ctx) => res(ctx.json(items[2])))
);

test('Assert Pageitempreview should display the preview on route preview/:id', async () => {
    const history = createMemoryHistory()
    history.push('preview/1')
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
    // expect((await screen.findByTestId('Pagehomepathwrappedrowlist')).children[0].children).toHaveLength(10);
});


test('Assert Pageitempreview should display the preview on route preview/:id using only number references', async () => {
    const history = createMemoryHistory()
    history.push('preview/qwdqwd1')
    expect(() => render(
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>,
    )).toThrowError();

    // await waitFor(() => screen.getAllByTestId('Cellitemdisplay'));
    // expect(screen.findByTestId('Pageitempreview')).toBeInTheDocument();
    // expect((await screen.findByTestId('Pagehomepathwrappedrowlist')).children[0].children).toHaveLength(10);
});

test('Assert Pageitempreview should display the picture related to the refence id', async () => {
    const history = createMemoryHistory()
    history.push('preview/1')
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
    await waitFor(() => expect(screen.getByTestId('Pageitempreview').children[0]).toHaveStyle(`background-image: url(https://bookandshoprails.herokuapp.com/res/5568.jpeg)`))
    expect(screen.getByTestId('Pageitempreview').children[0]).toHaveStyle(`background-image: url(https://bookandshoprails.herokuapp.com/res/5568.jpeg)`);
    
    // await waitFor(() => screen.getAllByTestId('Cellitemdisplay'));
    // expect(screen.findByTestId('Pageitempreview')).toBeInTheDocument();
    // expect((await screen.findByTestId('Pagehomepathwrappedrowlist')).children[0].children).toHaveLength(10);
});

