import { createDefaultreducer } from '../reducers/createDefaultreducer';

test('createDefaultreducer should return new reducer using strings', async () => {
  const myreducer = createDefaultreducer('newreducer');
  let state = {};
  state = myreducer(state, { type: 'Updatenewreducer', k: 'msg', v: 'hello world!' });
  expect(state.msg).toMatch('hello world!');
});

test('createDefaultreducer reducer should be able to update', async () => {
  const myreducer = createDefaultreducer('newreducer');
  let state = {
    msg: 'Ahio!',
  };
  state = myreducer(state, { type: 'Updatenewreducer', k: 'msg', v: 'hello world!' });
  expect(state.msg).toMatch('hello world!');
});

test('createDefaultreducer reducer should be able delete a key', async () => {
  const myreducer = createDefaultreducer('newreducer');
  let state = {
    msg: 'Ahio!',
  };
  state = myreducer(state, { type: 'd_newreducer', k: 'msg' });
  expect(state.msg).toBeUndefined();
});

test('createDefaultreducer should return new reducer using unconstrained strings', async () => {
  const name = '123$newreducer';
  const myreducer = createDefaultreducer(name);
  let state = {};
  state = myreducer(state, { type: `Update${name}`, k: 'msg', v: 'hello world!' });
  expect(state.msg).toMatch('hello world!');
});
