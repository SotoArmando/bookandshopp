/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Rowitemcartdisplay from '../components/Rowitemcartdisplay';

function Pagecommitsession({
  children, bookcart, shopcart, upstreamUser, id, ClearCarts, addAppointment,
}) {
  const location = useLocation();
  const history = useHistory();
  const isShopping = ['/checkout', '/configure'].indexOf(location.pathname) !== 1;
  const [form, setForm] = useState({
    payment_method: 'Credit Cart',
    user_id: id,
  });

  const [errors, setErrors] = useState([]);

  function handleUnauthorizederrors(errors) {
    setErrors(errors);
  }

  function handleSuccesfulAuthorization(response) {
    // eslint-disable-next-line no-debugger
    debugger;
    addAppointment(response);
    bookcart.forEach(({ id }) => {
      upstreamUser(id, {}, 'user/DestroyBookeditem');
    });
    shopcart.forEach(({ id }) => {
      upstreamUser(id, {}, 'user/DestroyCartitem');
    });
    ClearCarts();
    history.push('/appointments');
  }

  const createAppointment = (id, payload) => {
    const cart0 = shopcart.map(({ item_id: a, user_id: b }) => ({ item_id: a, user_id: b }));
    const cart1 = bookcart.map(({ item_id: a, user_id: b }) => ({ item_id: a, user_id: b }));
    upstreamUser(id, {
      ...payload,
      cartitem: cart0,
      bookeditem: cart1,
    }, 'user/CreateAppointment', handleSuccesfulAuthorization, handleUnauthorizederrors);
  };

  const seekforExceptions = () => {
    if (id === -1) {
      handleUnauthorizederrors(Object.entries({ user: 'You need to be signed in in to your user to do this' }));
      return false;
    }
    return true;
  };

  const handleClick = (type, id, payload) => {
    switch (type) {
      case 'confirm payment':
        if (!seekforExceptions()) {
          return -1;
        }
        createAppointment(id, payload);
        break;
      case 'back':
        history.push('/shop');
        break;
      default:
        break;
    }
    return 0;
  };

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    [children,
      <div key="Pagecommitsession" className="allsize row wrap gbasis_43 back_green_o2 center pad_22">
        <div className="maxedcorebox_x21 row wrap gbasis_43 back_2 corebox_18 borderradius_27 boxshadow_24">
          <div className="back_green_o0 borderradius_left_27 col pad_33 mobilepad_23 mobilecorebox_16 ">
            <div className="col center items_start corebox_8 mobilepad_t34">
              <span className="f_6 f700 ls_40 fore_9">VESPA</span>
              <span className="f_1 f600 ls_30 fore_9">Store</span>
            </div>
            {(isShopping ? shopcart : bookcart).map(
              ({ item_id: Itemid }, i) => (
                <Rowitemcartdisplay
                  key={`${Itemid}`}
                  i={i}
                  item_id={Itemid}
                  toremove={false}
                />
              ),
            )}

          </div>
          <div className="col center items_start pad_33">
            <span className="f_2 f600 corebox_3 items_center row">Payment Methods</span>
            <div className="row wrap">
              <input type="radio" id="html" name="payment_method" onChange={handleChange} value="Credit Card" />
              <label aria-hidden="true" htmlFor="html" for="html" className="btn_u center corebox_x7 corebox_2">
                Credit Card
              </label>
              <input type="radio" id="css" name="payment_method" onChange={handleChange} value="Paypal" />
              <label aria-hidden="true" htmlFor="css" for="css" className="btn_u center corebox_x5 corebox_2">
                Paypal
              </label>
            </div>
            <form className="col">
              <input className="corebox_2" onChange={handleChange} name="name" placeholder="Name on Card" required />
              <input className="corebox_2" onChange={handleChange} name="cardnumber" placeholder="Card Number" required />
              <div className="row gbasis_40">
                <input className="corebox_2" onChange={handleChange} placeholder="Expiration" name="expiration" required />
                <input className="corebox_2" onChange={handleChange} placeholder="CVV" name="cvv" required />

              </div>
            </form>
            <span className="row items_center corebox_3">
              By Clicking *Confirm Payment* I agree to the companies term of services.
            </span>
            {
            errors.length > 0
              ? errors.map(([k, v]) => (
                <div key={`error${k + v}`} className="corebox_2 fore_red center">
                  {`${k} ${v || ''}`}
                </div>
              ))
              : []
          }
            <div className="row items_center corebox_4">
              {['back', 'confirm payment'].map((e) => (
                <span
                  aria-hidden
                  onClick={() => handleClick(e, id, form)}
                  key={e}
                  className="corebox_x9 btn_u tcenter center maxedcorebox_3 back_green_o0 fore_9"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>,
    ]
  );
}

Pagecommitsession.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  shopcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  upstreamUser: PropTypes.func.isRequired,
  addAppointment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  ClearCarts: PropTypes.func.isRequired,
};

const mapStatetoProps = (
  {
    session: { id }, user: { bookcart, shopcart },
  },
) => ({
  id, bookcart, shopcart,
});
const mapDispatchtoProps = (dispatch) => ({
  RemoveStoreitemfromShopcart: (cartitem) => dispatch({ type: 'user/deleteStoreItemFromUserShoppingCart', cartitem }),
  RemoveStoreitemfromBookcart: (cartitem) => dispatch({ type: 'user/deleteStoreItemFromUserBookingCart', cartitem }),
  RemovepreviousSession: () => dispatch({ type: 'sessions/Logout' }),
  addAppointment: (appointment) => dispatch({ type: 'user/addUserAppointment', appointment }),
  ClearCarts: () => dispatch({ type: 'user/clearCarts' }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagecommitsession);
