import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Cellitemdisplay from '../components/Cellitemdisplay';
import Wrappedrowlist from '../components/Wrappedrowlist';

function Pagehomepath({
  setAppstate, appdata, appdata: { data }, addStoreitemToShopcart, addStoreitemToBookcart,
  syncronizeStoreItems, authorization,
  shopcart, bookcart, upstreamUser, activesession, children,
}) {
  const history = useHistory();

  const handleItemsClick = (operation, {
    id,
  }) => {
    const { id: sessionid } = activesession;
    // Enables the use Is not an number to check id passed to the rowitemcartdisplay
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) { return; }
    switch (operation) {
      case 'Preview':
        history.push(`/preview/${id}`);
        break;
      case 'Add to Cart':
        addStoreitemToShopcart(id);
        upstreamUser(sessionid, { ...activesession, bookcart, shopcart: [...shopcart, id] });
        break;
      case 'Add to Booking':
        addStoreitemToBookcart(id);
        upstreamUser(sessionid, { ...activesession, shopcart, bookcart: [...bookcart, id] });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      syncronizeStoreItems(data);
    }
    setAppstate({ ...appdata, authorization });
  }, [data]);

  return (
    [children,
      <div className=" col center relative  " key="pagehomepathroot">
        <div className="corebox_10 center col">
          <span className="f_4 f700 corebox_3 center row ffam_inter">LATEST MODELS</span>
          <span className="f_0 corebox_1 center row mar_b22 ffam_opensans">Please select a vespa model</span>
        </div>
        <Wrappedrowlist
          testid="Pagehomepathwrappedrowlist"
          className="center"
          handleClick={handleItemsClick}
          item={Cellitemdisplay}
          list={data}
          basis={43}
          marginh={35}
          marginv={35}
          paginate
          g="g"
        />
        <div className="corebox_6" />
      </div>]
  );
}

Pagehomepath.propTypes = {
  addStoreitemToShopcart: PropTypes.func.isRequired,
  addStoreitemToBookcart: PropTypes.func.isRequired,
  syncronizeStoreItems: PropTypes.func.isRequired,
  bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  shopcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  authorization: PropTypes.string.isRequired,
  setAppstate: PropTypes.func.isRequired,
  appdata: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      make: PropTypes.string,
      model: PropTypes.string,
      year: PropTypes.number,
      duration: PropTypes.string,
      pictureid: PropTypes.number,
    })),
  }).isRequired,
  activesession: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.string,
    bookcart: PropTypes.arrayOf(PropTypes.number),
    shopcart: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  upstreamUser: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const mapStatetoProps = (
  {
    session: { activesession, authorization },
    session: { activesession: { bookcart, shopcart } },
  },
) => ({
  bookcart, shopcart, activesession, authorization,
});

const mapDispatchtoProps = (dispatch) => ({
  addStoreitemToShopcart: (id) => dispatch({ type: 'sessions/updateUserShoppingCart', cartitem: id }),
  addStoreitemToBookcart: (id) => dispatch({ type: 'sessions/updateUserBookingCart', cartitem: id }),
  syncronizeStoreItems: (storeitems) => dispatch({ type: 'appstate/updateStoreItems', storeitems }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagehomepath);
