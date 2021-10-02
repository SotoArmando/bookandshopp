import SHA256 from 'crypto-js/sha256';
import { dbkeys, fetcher } from '../fetch';

export default function sessionProvider({ user, password, nick } = {},
  handleSuccesfulAuthorization,
  handleUnauthorizederrors) {
  let privatepassword;
  const { users_crud: url0, authenticate: url1 } = dbkeys;

  function handleResponse({
    error = false, token, bookcart, shopcart, exp, username, id,
  }) {
    if (error) {
      handleUnauthorizederrors([error]);
    } else {
      handleSuccesfulAuthorization({
        token, bookcart, shopcart, exp, username, id,
      });
    }
  }

  function handleUserCreationStatus() {

  }

  function deleteIdkey(a) {
    // https://eslint.org/docs/rules/no-param-reassign
    // eslint-disable-next-line no-param-reassign
    delete a.id;
  }

  function upstreamUser(id, payload, authorization) {
    deleteIdkey(payload);
    if (id) {
      const { users_crud: url0 } = dbkeys;
      fetcher(`${url0}/${id}?${new URLSearchParams({ user: JSON.stringify(payload) }).toString()}`, () => {}, authorization).fetchcrudOperation('PATCH');
    }
  }

  function createnewUser() {
    privatepassword = SHA256(password).toString();
    fetcher(url0, handleUserCreationStatus).fetchcrudOperation('POST', { user: { user, password: privatepassword, nick } });
    return 0;
  }

  function authorize() {
    privatepassword = SHA256(password).toString();
    fetcher(url1, (c) => handleResponse(c)).fetchcrudOperation('POST', { user, password: privatepassword });
    return 0;
  }

  return {
    authorize,
    createnewUser,
    upstreamUser,
  };
}
