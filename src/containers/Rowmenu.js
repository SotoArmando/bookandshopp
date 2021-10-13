import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Cellcart from '../components/Cellcart';
import Colummenu from '../components/Columnmenu';

function Rowmenu({
  RemoveStoreitemfromShopcart, RemoveStoreitemfromBookcart,
  RemovepreviousSession,
  id: activesessionid, upstreamUser,
  handleColumnMenuisOpenSwitch, shopcart, bookcart, ClearCarts, ClearAppointments,
}) {
  const history = useHistory();
  const handleCartClick = useCallback((operation, id, index) => {
    switch (operation) {
      case 'Remove from shopcart':
        RemoveStoreitemfromShopcart(index);
        upstreamUser(id, {}, 'user/DestroyCartitem');
        break;
      case 'Remove from bookcart':
        RemoveStoreitemfromBookcart(index);
        upstreamUser(id, {}, 'user/DestroyBookeditem');
        break;
      case 'Push to checkout':
        history.push('/checkout');
        break;
      case 'Push to configure':
        history.push('/configure');
        break;
      default:
        break;
    }
  });

  function handleRowmenuClick(k, v) {
    switch (k) {
      case 'Sign out':
        RemovepreviousSession();
        ClearCarts();
        ClearAppointments();
        history.push(v);
        break;
      default:
        history.push(v);
        break;
    }
  }

  const paths = Object.entries({
    Appointments: '/appointments',
    [`${activesessionid !== -1 ? 'Sign out' : 'Sign'}`]: '/sign',
  });

  return (
    <div key="Rowmenu1" className="nav corebox_3 row space_between items_center back_2 border_b3 ">
      <div>
        <Colummenu handleColumnMenuisOpenSwitch={handleColumnMenuisOpenSwitch} />
      </div>
      <div className="row">
        <Cellcart handleClick={handleCartClick} bookcart={bookcart} shopcart={shopcart} />
        {
          paths.map(([k, v]) => [
            <input key={`Rowmenupathinput${k}`} type="radio" id={k} name="Rowmenupaths" value={k} className="hide" />,
            // Enables the use of labels x input to use a clean css check effect
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            <label role="button" key={`Rowmenupathlabel${k}`} htmlFor={k} className="corebox_4 row items_center  pad_l22 pad_r22 center f_0 btn_u" onKeyDown={() => handleRowmenuClick(v)} onClick={() => handleRowmenuClick(k, v)}>{k}</label>])
        }
      </div>
    </div>
  );
}

Rowmenu.propTypes = {
  RemoveStoreitemfromShopcart: PropTypes.func.isRequired,
  RemoveStoreitemfromBookcart: PropTypes.func.isRequired,
  RemovepreviousSession: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  upstreamUser: PropTypes.func.isRequired,
  ClearCarts: PropTypes.func.isRequired,
  ClearAppointments: PropTypes.func.isRequired,
  handleColumnMenuisOpenSwitch: PropTypes.func.isRequired,
  shopcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
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
  ClearCarts: () => dispatch({ type: 'user/clearCarts' }),
  ClearAppointments: () => dispatch({ type: 'user/clearAppointments' }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Rowmenu);
