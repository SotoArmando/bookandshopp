import SHA256 from 'crypto-js/sha256';
import { dbkeys, fetcher } from '../fetch';

export default function sessionProvider({ user, password, nick } = {},
  handleSuccesfulAuthorization,
  handleUnauthorizederrors) {
  let privatepassword;
  const { users_crud: url0, authenticate: url1 } = dbkeys;
  let fetchersession;

  function handleResponse(response) {
    const { status } = fetchersession;

    if (status > 400) {
      handleUnauthorizederrors([Object.entries(response)]);
    } else {
      const {
        token, bookcart, shopcart, exp, username, id,
      } = response;
      handleSuccesfulAuthorization({
        token, bookcart, shopcart, exp, username, id,
      });
    }
  }

  function deleteIdkey(a) {
    // https://eslint.org/docs/rules/no-param-reassign
    // eslint-disable-next-line no-param-reassign
    delete a.id;
  }

  function upstreamUserAction(type, id, payload, authorization) {
    const { BookedItemsCrud, CartItemsCrud } = dbkeys;
    deleteIdkey(payload);
    switch (type) {
      case 'user/CreateBookeditem':
        fetcher(`${BookedItemsCrud}/`, () => {}, authorization).fetchcrudOperation('POST', payload);
        break;
      case 'user/DestroyBookeditem':
        fetcher(`${BookedItemsCrud}/${id}`, () => {}, authorization).fetchcrudOperation('DELETE');
        break;
      case 'user/CreateCartitem':
        fetcher(`${CartItemsCrud}/`, () => {}, authorization).fetchcrudOperation('POST', payload);
        break;
      case 'user/DestroyCartitem':
        fetcher(`${CartItemsCrud}/${id}`, () => {}, authorization).fetchcrudOperation('DELETE');
        break;
      default:
        break;
    }
  }

  function createnewUser() {
    privatepassword = SHA256(password).toString();
    fetchersession = fetcher(url0, handleResponse);
    fetchersession.fetchcrudOperation('POST', { user: { user, password: privatepassword, nick } });
    return 0;
  }

  function authorize() {
    privatepassword = SHA256(password).toString();
    fetchersession = fetcher(url1, handleResponse);
    fetchersession.fetchcrudOperation('POST', { user: { user, password: privatepassword } });
    return 0;
  }

  return {
    authorize,
    createnewUser,
    upstreamUserAction,
  };
}
