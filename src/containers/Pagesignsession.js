import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import sessionProvider from '../res/sessionprovider';

function Pagesignsession({
  syncroniseUserSession,
  setAuthorization,
  children,
  clearCarts, addBookeditem, addCartitem,
}) {
  const [sign, setSign] = useState(false);
  const [errors, setErrors] = useState([]);
  const [formstate, setState] = useState({
    user: '',
    password: '',
    confirm_password: '',
    nick: '',
  });
  const history = useHistory();

  function handleChange(event) {
    setState({ ...formstate, [event.target.name]: event.target.value });
  }

  function handleSuccesfulAuthorization({
    user, id, token, bookcart, shopcart,
  }) {
    syncroniseUserSession({
      user,
      id,
    }, token);
    clearCarts();
    bookcart.forEach((o) => addBookeditem(o));
    shopcart.forEach((o) => addCartitem(o));
    setAuthorization(token);
    history.push('/');
  }

  function handleUnauthorizederrors(errors) {
    setErrors(errors);
  }

  function handleSessionProvide(operation, payload) {
    setErrors([]);
    switch (operation) {
      case 'Sign up':
        sessionProvider(
          payload,
          () => { setSign(true); },
          handleUnauthorizederrors,
        ).createnewUser();
        break;
      case 'Sign in':
        sessionProvider(
          payload,
          handleSuccesfulAuthorization,
          handleUnauthorizederrors,
        ).authorize();
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    setErrors([]);
    event.preventDefault();
    if (sign) {
      if (formstate.password === formstate.confirm_password) {
        handleSessionProvide('Sign up', formstate);
      } else {
        setErrors(['Confirm password and password must be equal']);
      }
    } else { handleSessionProvide('Sign in', formstate); }
  }

  return [
    children,
    <div key="Pagesignsession">
      <div className="center col">
        <div className="maxedcorebox_x18">
          <span className="f_2 corebox_3 row items_center">Welcome</span>
          <form id="Signform" onSubmit={handleSubmit} className="col">
            <label htmlFor="userinput" className="pad_t22">
              Email
              <input id="userinput" name="user" value={formstate.user} className="border_3 corebox_2" onChange={handleChange} />
            </label>
            <label htmlFor="passwordinput" className="pad_t22">
              Password
              <input id="passwordinput" name="password" value={formstate.password} className="border_3 corebox_2" type="password" onChange={handleChange} />
            </label>
            {sign
              ? (
                [
                  <label key="inputconfirm" htmlFor="confirminput" className="pad_t22">
                    Confirm Password
                    <input id="confirminput" type="password" name="confirm_password" value={formstate.confirm_password} className="border_3 corebox_2" onChange={handleChange} />
                  </label>,
                  <label key="inputnick" htmlFor="nickinput" className="pad_t22">
                    Nick
                    <input htmlFor="nickinput" name="nick" className="border_3 corebox_2" value={formstate.nick} onChange={handleChange} />
                  </label>]
              )

              : []}

          </form>
          {
            errors.length > 0
              ? errors.map(([k, v]) => (
                <div key={`error${k + v}`} className="corebox_2 fore_red capitalize center">
                  {`${k} ${v || ''}`}
                </div>
              ))
              : []
          }
          <div className="row">
            <button type="button" className="corebox_2 center" onClick={() => setSign(true)}>Sign Up</button>
            <button type="button" className="corebox_2 center" onClick={() => setSign(false)}>Sign In</button>
          </div>
          <button
            form="Signform"
            type="submit"
            value="Submit"
            className="corebox_2 border_0 back_0 btn_u f_0"
          >
            Submit
          </button>
        </div>
      </div>
    </div>,
  ];
}

Pagesignsession.propTypes = {
  syncroniseUserSession: PropTypes.func.isRequired,
  setAuthorization: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  clearCarts: PropTypes.func.isRequired,
  addBookeditem: PropTypes.func.isRequired,
  addCartitem: PropTypes.func.isRequired,
  appdata: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({
          make: PropTypes.string,
          model: PropTypes.string,
          year: PropTypes.number,
          id: PropTypes.number,
        }),
        picture: PropTypes.shape({
          pictureid: PropTypes.string,
        }),
      }),
    ),
  }).isRequired,
};

const mapStatetoProps = ({
  appstate: { bookcart, shopcart },
}) => ({ bookcart, shopcart });
const mapDispatchtoProps = (dispatch) => ({
  syncroniseUserSession: (user, authorization) => dispatch({ type: 'sessions/Login', user, authorization }),
  addCartitem: (cartitem) => dispatch({ type: 'user/addUserBookedItem', cartitem }),
  addBookeditem: (cartitem) => dispatch({ type: 'user/addUserCartItem', cartitem }),
  clearCarts: (user, authorization) => dispatch({ type: 'user/clearCarts', user, authorization }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagesignsession);
