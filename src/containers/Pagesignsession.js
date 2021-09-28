import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Forminput from '../components/Forminput';
import { newuser, newsession } from '../res/formsetup';
import { dbkeys, fetcher } from '../fetch';

function Pagesignsession({
  u_appstate: Uappstate,
  u_session: Usession,
}) {
  const [sign, setSign] = useState(false);
  const history = useHistory();

  function handleResponse({
    status, bookcart, shopcart, id,
  }, payload) {
    const { user } = payload;
    if (status === 'Succesfully Authenticated') {
      Uappstate('bookcart', bookcart);
      Uappstate('shopcart', shopcart);
      Usession('active', true);
      Usession('activesession', {
        user,
        bookcart,
        shopcart,
        id,
      });
      history.push('/');
    }
  }

  function handleClick(operation, payload) {
    const { users_crud: url0, sessions_crud: url1 } = dbkeys;

    switch (operation) {
      case 'Sign up':
        fetcher(url0, (c) => handleResponse(c, payload)).fetchcrudOperation('POST', { user: payload });
        break;
      case 'Sign in':
        fetcher(url1, (c) => handleResponse(c, payload)).fetchcrudOperation('POST', { user: payload });
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <div className="center col">
        <div className="maxedcorebox_x18">
          <span className="f_2 corebox_3 row items_center">Welcome</span>
          <Forminput entries={sign ? newuser : newsession} id="Signform" handleCapture={(c) => handleClick(sign ? 'Sign up' : 'Sign in', c)} />
          <button type="button" className="corebox_2 center" onClick={() => setSign(!sign)}>Switch between sign in and sign up</button>
          <button
            form="Signform"
            type="submit"
            value="Submit"
            className="corebox_2 border_0 back_0 btn_u f_0"
          >
            Submit Signform
          </button>
        </div>
      </div>
    </div>
  );
}

Pagesignsession.propTypes = {
  u_appstate: PropTypes.func.isRequired,
  u_session: PropTypes.number.isRequired,
};

const mapStatetoProps = ({ appstate: { bookcart, shopcart } }) => ({ bookcart, shopcart });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagesignsession);
