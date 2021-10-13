import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { dbkeys, fetcher } from '../fetch';

function Rowitemappointment({
  id, name, cardnumber, expiration, cvv, created_at: CreatedAt, authorization,
}) {
  const [items, setItems] = useState({
    bookeditem: [],
    cartitem: [],
  });

  useEffect(() => {
    const { Appointments } = dbkeys;
    fetcher(`${Appointments}/${id}`,
      ({ bookeditem, cartitem }) => setItems({ bookeditem, cartitem }),
      authorization).fetchcrudOperation('GET');
  }, []);

  const { bookeditem, cartitem } = items;

  return (
    <div className="row wrap gbasis_40 corebox_8 items_center pad_22 border_4">
      <div className="col">
        <span className="f_3 f700 ls_33 ffam_inter">{new Date(CreatedAt).toDateString()}</span>
        {Object.entries({
          name, cardnumber, expiration, cvv,
        }).map(([k, v]) => <span key={`${k}${v}`}>{`${k}: ${JSON.stringify(v)}`}</span>)}
      </div>
      <div className="col">
        {Object.entries({
          cartitem, bookeditem,
        }).map(([k, v]) => <span key={`${k}${v}`}>{`${k}: ${JSON.stringify(v)}`}</span>)}
      </div>

    </div>
  );
}

Rowitemappointment.propTypes = {
  authorization: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  cardnumber: PropTypes.string.isRequired,
  expiration: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

const mapStatetoProps = (
  {
    session: { authorization },
  },
) => ({
  authorization,
});

export default connect(mapStatetoProps)(Rowitemappointment);
