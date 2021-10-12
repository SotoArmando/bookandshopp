import SHA256 from 'crypto-js/sha256';
import { dbkeys, fetcher } from '../fetch';

export default function sessionProvider({ user, password, nick } = {},
  handleSuccesfulAuthorization,
  handleUnauthorizederrors) {
  let privatepassword;
  const { UsersCrud: url0, authenticate: url1 } = dbkeys;
  let fetchersession;

  function handleResponse(response) {
    const { status } = fetchersession;
    // eslint-disable-next-line no-debugger
    debugger;
    if (status > 400) {
      handleUnauthorizederrors([Object.entries(response)]);
    } else {
      handleSuccesfulAuthorization(response);
    }
  }

  function upstreamUserAction(type, id, payload, authorization) {
    const { BookedItemsCrud, CartItemsCrud, Appointments } = dbkeys;
    // eslint-disable-next-line no-debugger
    debugger;
    switch (type) {
      case 'user/CreateBookeditem':
        fetchersession = fetcher(`${BookedItemsCrud}/`, handleResponse, authorization);
        fetchersession.fetchcrudOperation('POST', payload);
        break;
      case 'user/DestroyBookeditem':
        fetchersession = fetcher(`${BookedItemsCrud}/${id}`, () => {}, authorization);
        fetchersession.fetchcrudOperation('DELETE');
        break;
      case 'user/CreateCartitem':
        fetchersession = fetcher(`${CartItemsCrud}/`, handleResponse, authorization);
        fetchersession.fetchcrudOperation('POST', payload);
        break;
      case 'user/DestroyCartitem':
        fetchersession = fetcher(`${CartItemsCrud}/${id}`, () => {}, authorization);
        fetchersession.fetchcrudOperation('DELETE');
        break;
      case 'user/CreateAppointment':
        fetchersession = fetcher(`${Appointments}/`, handleResponse, authorization);
        fetchersession.fetchcrudOperation('POST', payload);
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
