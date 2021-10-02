import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { dbkeys, fetcher } from '../fetch';

export default function Rowitemcartdisplay({
  i,
  id,
  handleClick,
  marginh,
  marginv,
}) {
  // Enables the use Is not an number to check id passed to the rowitemcartdisplay
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) { throw Error('Rowitemcartdisplay: Is not an number id'); }
  const { 'Return item picture using id': url0, items_crud: url1 } = dbkeys;
  const [state, setState] = useState({ model: 0, year: 0, pictureid: 0 });

  const {
    model,
    year,
    pictureid,
  } = state;
  useEffect(() => {
    fetcher(`${url1}/${id}`, ({ item, picture: { pictureid } }) => {
      setState({ ...item, pictureid });
    }).fetch();
  }, []);

  return (
    <div data-testid="Rowitemcartdisplay" className={`row back_3 borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
      <div
        className="corebox_4 corebox_x4  cover"
        style={{
          backgroundImage: `url(${url0(pictureid)})`,
        }}
      />
      <div className="col pad_20 corebox_4">
        <div>
          {model}
          {' '}
          -
          {' '}
          {year}
        </div>
      </div>
      <button type="button" data-testid="Rowitemcartdisplay_removebtn" className="corebox_2 row items_center  center f_0 btn_u maxedcorebox_x5" onClick={() => handleClick(i)}>
        Remove
      </button>
    </div>
  );
}

Rowitemcartdisplay.propTypes = {
  i: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
};
