const ExpireTime = 60;

/* eslint max-len: 0 */

function createDefaultreducer(name) {
  return function defaultreducer(state = {}, Payload) {
    const { type: dispatch, k, v } = Payload;

    switch (dispatch) {
      case (`u_${name}`):

        return { ...state, [k]: v, LoadedAt: (new Date()).toISOString() };
      case (`d_${name}`):
        return { ...state, [k]: undefined };
      case ('persist/REHYDRATE'): {
        const {
          payload: { [name]: rehydrate, [name]: { LoadedAt } } =
          { [name]: { LoadedAt: new Date().toISOString() }, [name]: {} },
        } = Payload;
        const expireDate = new Date(LoadedAt);
        const isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
        const rehydrateorstate = (Object.keys(rehydrate).length > 1 ? rehydrate : state);
        return { ...(isExpired ? state : rehydrateorstate) };
      }

      default:
        return { ...state };
    }
  };
}

function createMapDispatchtoProps() {
  return function x(dispatch) {
    return [{}, 'session', 'appstate', 'system'].reduce((total, e) => {
      const b = `u_${e}`;
      const c = `d_${e}`;

      return {
        ...(total || {}),
        [b]: (k, v) => dispatch({ type: b, k, v }),
        [c]: (k, v) => dispatch({ type: c, k, v }),
      };
    });
  };
}

export { createMapDispatchtoProps, createDefaultreducer };
