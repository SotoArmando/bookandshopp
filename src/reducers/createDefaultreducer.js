function sessionsReducer(state = {
  active: false,
  activesession: {
    user: '',
    id: 0,
    nick: '',
  },
  authorization: '',
}, action) {
  const {
    type, user, authorization, cartitem,
  } = action;
  switch (type) {
    case 'sessions/Login': {
      return {
        ...state,
        active: true,
        activesession: user,
        authorization,
      };
    }
    case 'sessions/Logout': {
      return {
        ...state,
        active: false,
        activesession: {},
        authorization: '',
      };
    }
    case 'sessions/updateUserShoppingCart': {
      return {
        ...state,
        activesession: {
          ...state.activesession,
          shopcart: [...state.activesession.shopcart, cartitem],
        },
      };
    }
    case 'sessions/updateUserBookingCart': {
      return {
        ...state,
        activesession: {
          ...state.activesession,
          bookcart: [...state.activesession.bookcart, cartitem],
        },
      };
    }
    case 'sessions/deleteStoreItemFromUserShoppingCart': {
      return {
        ...state,
        activesession: {
          ...state.activesession,
          shopcart: [
            ...state.activesession.shopcart.slice(0, cartitem),
            ...state.activesession.shopcart.slice(cartitem + 1)],
        },
      };
    }
    case 'sessions/deleteStoreItemFromUserBookingCart': {
      return {
        ...state,
        activesession: {
          ...state.activesession,
          bookcart: [
            ...state.activesession.bookcart.slice(0, cartitem),
            ...state.activesession.bookcart.slice(cartitem + 1)],
        },
      };
    }
    case ('persist/REHYDRATE'): {
      const {
        payload: { session: rehydrate } = { session: {} },
      } = action;
      const rehydrateorstate = (Object.keys(rehydrate).length > 1 ? rehydrate : state);
      return { ...(rehydrateorstate) };
    }
    default:
      return state;
  }
}

function appstateReducer(state = {
  storeitems: [],
}, action) {
  const {
    type, storeitems,
  } = action;
  switch (type) {
    case 'appstate/updateStoreItems': {
      return {
        ...state,
        storeitems,
      };
    }
    case ('persist/REHYDRATE'): {
      const {
        payload: { appstate: rehydrate } = { appstate: {} },
      } = action;
      const rehydrateorstate = (Object.keys(rehydrate).length > 1 ? rehydrate : state);
      return { ...(rehydrateorstate) };
    }
    default:
      return state;
  }
}

export { sessionsReducer, appstateReducer };
