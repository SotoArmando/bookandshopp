const ExpireTime = 60;
function sessionsReducer(state, action) {
  const { type, user, authorization } = action;
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
        authorization: false,
      };
    }
    case ('persist/REHYDRATE'): {
      const {
        payload: { sessions: rehydrate, sessions: { LoadedAt } } =
        { sessions: { LoadedAt: new Date().toISOString() } },
      } = action;
      const expireDate = new Date(LoadedAt);
      const isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
      const rehydrateorstate = (Object.keys(rehydrate).length > 1 ? rehydrate : state);
      return { ...(isExpired ? state : rehydrateorstate) };
    }
    default:
      return state;
  }
}

function appstateReducer(state, action) {
  const {
    type, cartitem, storeitems, authorization,
  } = action;
  switch (type) {
    case 'appstate/updateAuthorization': {
      return {
        ...state,
        authorization,
      };
    }
    case 'appstate/updateStoreItems': {
      return {
        ...state,
        storeitems,
      };
    }
    case 'appstate/updateUserShoppingCart': {
      return {
        ...state,
        bookcart: [...state.shopcart, cartitem],
      };
    }
    case 'appstate/updateUserBookingCart': {
      return {
        ...state,
        status: [...state.bookcart, cartitem],
      };
    }
    case 'appstate/deleteStoreItemFromUserShoppingCart': {
      return {
        ...state,
        shopcart: [...state.shopcart.slice(0, cartitem - 1), ...state.shopcart.slice(cartitem)],
      };
    }
    case 'appstate/deleteStoreItemFromUserBookingCart': {
      return {
        ...state,
        bookcart: [...state.bookcart.slice(0, cartitem - 1), ...state.bookcart.slice(cartitem)],
      };
    }
    case ('persist/REHYDRATE'): {
      const {
        payload: { appstate: rehydrate, appstate: { LoadedAt } } =
        { appstate: { LoadedAt: new Date().toISOString() } },
      } = action;
      const expireDate = new Date(LoadedAt);
      const isExpired = expireDate.setSeconds(expireDate.getSeconds() + ExpireTime) < new Date();
      const rehydrateorstate = (Object.keys(rehydrate).length > 1 ? rehydrate : state);
      return { ...(isExpired ? state : rehydrateorstate) };
    }
    default:
      return state;
  }
}

export { sessionsReducer, appstateReducer };
