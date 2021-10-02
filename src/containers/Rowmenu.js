import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Cellcart from './Cellcart';
import Colummenu from '../components/Columnmenu';

function Rowmenu({
  RemoveStoreitemfromShopcart, RemoveStoreitemfromBookcart,
  RemovepreviousSession,
  activesession: { bookcart, shopcart, id: activesessionid }, active, upstreamUser,
}) {
  const history = useHistory();

  const handleCartClick = useCallback((operation, id) => {
    switch (operation) {
      case 'Remove from shopcart':
        RemoveStoreitemfromShopcart(id);
        upstreamUser(activesessionid, {
          shopcart: [...shopcart.slice(0, id), ...shopcart.slice(id + 1)],
        });
        break;
      case 'Remove from bookcart':
        RemoveStoreitemfromBookcart(id);
        upstreamUser(activesessionid, {
          bookcart: [...bookcart.slice(0, id), ...bookcart.slice(id + 1)],
        });
        break;
      default:
        break;
    }
  });

  function handleRowmenuClick(k, v) {
    switch (k) {
      case 'Sign out':
        RemovepreviousSession();
        history.push(v);
        break;
      default:
        history.push(v);
        break;
    }
  }

  const paths = Object.entries({
    Home: '/',
    [`${active ? 'Sign out' : 'Sign'}`]: '/sign',
  });

  return [
    <div key="Rowmenu0" className="corebox_2" />,
    <div key="Rowmenu1" className="nav corebox_2 row space_between items_center back_2 border_b3 ">
      <div>
        <Colummenu />
      </div>
      <div className="row">
        <Cellcart handleClick={handleCartClick} bookcart={bookcart} shopcart={shopcart} />
        {
          paths.map(([k, v]) => [
            <input key={`Rowmenupathinput${k}`} type="radio" id={k} name="Rowmenupaths" value={k} className="hide" />,
            // Enables the use of labels x input to use a clean css check effect
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            <label role="button" key={`Rowmenupathlabel${k}`} htmlFor={k} className="corebox_2 row items_center corebox_x5 center f_0 btn_u" onKeyDown={() => handleRowmenuClick(v)} onClick={() => handleRowmenuClick(k, v)}>{k}</label>])
        }
      </div>
    </div>,
  ];
}

Rowmenu.propTypes = {
  RemoveStoreitemfromShopcart: PropTypes.func.isRequired,
  RemoveStoreitemfromBookcart: PropTypes.func.isRequired,
  RemovepreviousSession: PropTypes.func.isRequired,
  activesession: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.string,
    bookcart: PropTypes.arrayOf(PropTypes.number),
    shopcart: PropTypes.arrayOf(PropTypes.number),
  }),
  active: PropTypes.bool.isRequired,
  upstreamUser: PropTypes.func.isRequired,
};

Rowmenu.defaultProps = {
  activesession: {
    id: 0,
    user: '',
    bookcart: [],
    shopcart: [],
  },
};

const mapStatetoProps = (
  {
    session: { activesession, active },
  },
) => ({
  activesession, active,
});
const mapDispatchtoProps = (dispatch) => ({
  RemoveStoreitemfromShopcart: (cartitem) => dispatch({ type: 'sessions/deleteStoreItemFromUserShoppingCart', cartitem }),
  RemoveStoreitemfromBookcart: (cartitem) => dispatch({ type: 'sessions/deleteStoreItemFromUserBookingCart', cartitem }),
  RemovepreviousSession: () => dispatch({ type: 'sessions/Logout' }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Rowmenu);
