/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { dbkeys } from '../fetch';

export default function Cellitemdisplay({
  handleClick,
  make,
  model,
  year,
  id,
  pictureid,
  marginh,
  marginv,
}) {
  console.log(id);
  const payload = {
    make, model, year, pictureid, id,
  };
  const { 'Return item picture using id': url0 } = dbkeys;

  const [mode, setMode] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setMode(['/', '/book', '/shop'].indexOf(location.pathname));
  }, [location]);

  const modes = [
    [],
    [
      <input key={`Cellitemdisplaymodel1${id}`} type="checkbox" id={pictureid} name="Rowmenudynamiccart" value="x" className="hide" />,
      // Enables the use of remote labels
      // using clean css approach to switch from tabs
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label key={`Cellitemdisplaymodel1label${id}`} aria-hidden="true" htmlFor={pictureid} for={pictureid} className="corebox_1 row items_center corebox_x8 center f_0 btn_u" data-testid="Cellitemdisplay_checkbtn" onClick={() => handleClick('Add to Booking', payload)}>Check</label>],
    <button type="button" key={`Cellitemdisplaymodel2${id}`} className="corebox_1 row items_center corebox_x8 center f_0 btn_u" data-testid="Cellitemdisplay_addtocartbtn" onClick={() => handleClick('Add to Cart', payload)}>Add to Cart</button>,
  ];

  return (
    <div key={`Cellitemdisplay${id}`} data-testid="Cellitemdisplay" className={`col  back_3 borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
      <div
        className="corebox_11 cover"
        style={{
          backgroundImage: `url(${url0(pictureid)})`,
        }}
      />
      <div className="col pad_20">
        <div>
          {year}
          {' '}
          {model}
        </div>
      </div>
      {modes[mode]}
      <button type="button" className="corebox_1 row items_center corebox_x8 center f_0 btn_u" data-testid="Cellitemdisplay_previewtbtn" onClick={() => handleClick('Preview', payload)}>Preview</button>
    </div>
  );
}

Cellitemdisplay.propTypes = {
  handleClick: PropTypes.func.isRequired,
  make: PropTypes.number.isRequired,
  model: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  pictureid: PropTypes.number.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
};
