import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellitemdisplay from '../components/Cellitemdisplay';
import Wrappedrowlist from '../components/Wrappedrowlist';

function Pagehomepath({
  appdata: { data }, u_appstate: Uappstate, bookcart,
  shopcart, upstreamUser, activesession,
}) {
  const history = useHistory();

  const handleItemsClick = (operation, {
    id,
  }) => {
    console.log(operation, id);
    const { id: sessionid } = activesession;
    // Enables the use Is not an number to check id passed to the rowitemcartdisplay
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) { return; }
    switch (operation) {
      case 'Preview':
        history.push(`/preview/${id}`);
        break;
      case 'Add to Cart':
        Uappstate('shopcart', [...shopcart, id]);
        upstreamUser(sessionid, { ...activesession, bookcart, shopcart: [...shopcart, id] });
        break;
      case 'Add to Booking':
        Uappstate('bookcart', [...bookcart, id]);
        upstreamUser(sessionid, { ...activesession, shopcart, bookcart: [...bookcart, id] });
        break;
      default:
        break;
    }
  };
  return (
    <div className="">
      <Wrappedrowlist
        testid="Pagehomepathwrappedrowlist"
        className="center"
        handleClick={handleItemsClick}
        item={Cellitemdisplay}
        list={data}
        basis={43}
        marginh={22}
        marginv={22}
      />
    </div>
  );
}

Pagehomepath.propTypes = {
  u_appstate: PropTypes.func.isRequired,
  bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
  shopcart: PropTypes.arrayOf(PropTypes.number).isRequired,
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
};

const mapStatetoProps = (
  {
    appstate: { bookcart, shopcart },
    session: { activesession },
  },
) => ({ bookcart, shopcart, activesession });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagehomepath);
