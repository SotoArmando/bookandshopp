import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Cellitemdisplay from '../components/Cellitemdisplay';
import Wrappedrowlist from '../components/Wrappedrowlist';

function Pagehomepath({
  setAuthorization, items, addStoreitemToShopcart, addStoreitemToBookcart,
  syncronizeStoreItems, authorization, activesessionid,
  upstreamUser, children,
}) {
  const history = useHistory();

  const handleItemsClick = (operation, {
    id,
  }) => {
    // Enables the use Is not an number to check id passed to the rowitemcartdisplay
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) { return; }
    switch (operation) {
      case 'Preview':
        history.push(`/preview/${id}`);
        break;
      case 'Add to Cart':
        addStoreitemToShopcart({ item_id: id });
        upstreamUser(activesessionid, { user_id: activesessionid, item_id: id }, 'user/CreateCartitem');
        break;
      case 'Add to Booking':
        addStoreitemToBookcart({ item_id: id });
        upstreamUser(activesessionid, { user_id: activesessionid, item_id: id }, 'user/CreateBookeditem');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      syncronizeStoreItems(items);
    }
    setAuthorization(authorization);
  }, [items]);

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
          list={items}
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
  activesessionid: PropTypes.number.isRequired,
  authorization: PropTypes.string.isRequired,
  setAuthorization: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
    duration: PropTypes.string,
    pictureid: PropTypes.number,
  })).isRequired,

  upstreamUser: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

const mapStatetoProps = (
  {
    session: { activesession, authorization, id: activesessionid },
    user: { bookcart, shopcart },
  },
) => ({
  bookcart, shopcart, activesession, authorization, activesessionid,
});

const mapDispatchtoProps = (dispatch) => ({
  addStoreitemToShopcart: (id) => dispatch({ type: 'user/addUserCartItem', cartitem: id }),
  addStoreitemToBookcart: (id) => dispatch({ type: 'user/addUserBookedItem', cartitem: id }),
  syncronizeStoreItems: (storeitems) => dispatch({ type: 'appstate/updateStoreItems', storeitems }),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagehomepath);
