import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { dbkeys, fetcher } from '../fetch';

export default function Rowitemcartdisplay({
  i,
  item_id: Itemid,
  id,
  handleClick,
  marginh,
  marginv,
}) {
  // Enables the use Is not an number to check id passed to the rowitemcartdisplay
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(Itemid)) { throw Error('Rowitemcartdisplay: Is not an number id'); }
  const { 'Return item picture using id': url0, items_crud: url1 } = dbkeys;
  const [state, setState] = useState({ model: 0, year: 0, pictureid: 0 });

  const {
    model,
    year,
    pictureid,
  } = state;
  useEffect(() => {
    fetcher(`${url1}/${Itemid}`, (resp) => {
      setState({ ...resp, pictureid: resp.picture.pictureid });
    }).fetch();
  }, []);

  return (
    <div data-testid="Rowitemcartdisplay" className={`row back_3 borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
      <div
        className="corebox_4 corebox_x4  cover"
        style={{
          backgroundImage: `${pictureid === 0 ? '' : `url(${url0(pictureid)})`}`,
        }}
      />
      <div className="row pad_20 corebox_4 items_center">
        <div>
          {model}
          {' '}
          -
          {' '}
          {year}
          {' '}
          {Itemid}
        </div>
      </div>
      <button type="button" data-testid="Rowitemcartdisplay_removebtn" className="corebox_2 row items_center  center f_0 btn_u maxedcorebox_x5" onClick={() => handleClick(id, i)}>
        Remove
      </button>
    </div>
  );
}

Rowitemcartdisplay.propTypes = {
  i: PropTypes.number.isRequired,
  item_id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
};
