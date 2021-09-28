import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellcart from './Cellcart';
import Colummenu from '../components/Columnmenu';

function Rowmenu({
  bookcart, shopcart, u_appstate: Uappstate,
  u_session: Usession, activesession, active, upstreamUser,
}) {
  const history = useHistory();

  const handleCartClick = useCallback((operation, id) => {
    switch (operation) {
      case 'Remove from shopcart':
        Uappstate('shopcart', shopcart.filter((e) => e !== id));
        upstreamUser(activesession.id, { shopcart: shopcart.filter((e) => e !== id) });
        break;
      case 'Remove from bookcart':
        Uappstate('bookcart', bookcart.filter((e) => e !== id));
        upstreamUser(activesession.id, { bookcart: bookcart.filter((e) => e !== id) });
        break;
      default:
        break;
    }
  }, [Uappstate, upstreamUser]);

  function handleRowmenuClick(k) {
    switch (k) {
      case 'Sign out':
        Uappstate('bookcart', []);
        Uappstate('shopcart', []);
        Usession('active', false);
        Usession('activesession', {
          id: 0,
          user: undefined,
          bookcart: [],
          shopcart: [],
        });
        break;
      default:
        history.push(k);
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
          paths.map(([k]) => [
            <input key={`Rowmenupathinput${k}`} type="radio" id={k} name="Rowmenupaths" value={k} className="hide" />,
            // Enables the use of labels x input to use a clean css check effect
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            <label role="button" key={`Rowmenupathlabel${k}`} htmlFor={k} className="corebox_2 row items_center corebox_x5 center f_0 btn_u" onKeyDown={() => handleRowmenuClick(k)} onClick={() => handleRowmenuClick(k)}>{k}</label>])
        }
      </div>
    </div>,
  ];
}

Rowmenu.propTypes = {
  bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  shopcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  u_appstate: PropTypes.func.isRequired,
  u_session: PropTypes.func.isRequired,
  activesession: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.string,
    bookcart: PropTypes.arrayOf(PropTypes.number),
    shopcart: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  active: PropTypes.bool.isRequired,
  upstreamUser: PropTypes.func.isRequired,
};

const mapStatetoProps = (
  {
    appstate: { bookcart, shopcart },
    session: { activesession, active },
  },
) => ({
  bookcart, shopcart, activesession, active,
});
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Rowmenu);
