function sessionsReducer(state = {
  id: -1,
  user: '',
  nick: '',
  authorization: '',
}, action) {
  const {
    type, user, authorization,
  } = action;
  switch (type) {
    case 'sessions/Login': {
      return {
        ...state,
        ...user,
        authorization,
      };
    }
    case 'sessions/Logout': {
      return {
        ...state,
        id: -1,
        user: '',
        nick: '',
        authorization: '',
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

function userReducer(state = {
  shopcart: [],
  bookcart: [],
  appointment: [],
}, action) {
  const {
    type, cartitem, appointment: newappointment,
  } = action;
  const { shopcart, bookcart, appointment } = state;

  switch (type) {
    case 'user/addUserAppointment': {
      return {
        ...state,
        appointment: [...appointment, newappointment],
      };
    }
    case 'user/addUserCartItem': {
      return {
        ...state,
        shopcart: [...shopcart, cartitem],
      };
    }
    case 'user/addUserBookedItem': {
      return {
        ...state,
        bookcart: [...bookcart, cartitem],
      };
    }
    case 'user/deleteStoreItemFromUserShoppingCart': {
      return {
        ...state,
        shopcart: [
          ...shopcart.slice(0, cartitem),
          ...shopcart.slice(cartitem + 1)],
      };
    }
    case 'user/deleteStoreItemFromUserBookingCart': {
      return {
        ...state,
        bookcart: [
          ...bookcart.slice(0, cartitem),
          ...bookcart.slice(cartitem + 1)],
      };
    }
    case 'user/clearCarts': {
      return {
        bookcart: [],
        shopcart: [],
        appointment,
      };
    }
    case 'user/clearAppointments': {
      return {
        ...state,
        appointment: [],
      };
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

export { sessionsReducer, appstateReducer, userReducer };
