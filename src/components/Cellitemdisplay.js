/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { dbkeys } from '../fetch';

export default function Cellitemdisplay({
  handleClick,
  item: {
    make,
    model,
    year,
    id,
  },
  picture: {
    pictureid,
  },
  marginh,
  marginv,
}) {
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
    <div key={`Cellitemdisplay${id}`} data-testid="Cellitemdisplay" className={`col corebox_x14 maxedcorebox_x14 mobilemaxedcorebox_x13  borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
      <div className="center">
        <div
          className="corebox_10 mobilecorebox_12 maxedcorebox_x10 mobilemaxedcorebox_x12 cover borderradius_40"
          style={{
            backgroundImage: `url(${url0(pictureid)})`,
          }}
        />
      </div>
      <div className="col pad_20 tcenter f_0 ls_29 f600">
        <div className="center corebox_2 ">
          {year}
          {' '}
          {model}
        </div>
      </div>
      <div className=" border_bdashed4" />
      <div className="tcenter corebox_5 items_center center pad_l23 pad_r23 pad_b21 borderbox fore_17 ls_22">
        The VESPA C20 is a stunning moped with a modern electronic system and more
      </div>
      <div className="row center">
        {['facebook', 'twitter', 'instagram'].map((e) => (
          <span key={e} className="corebox_3 maxedcorebox_x3 center border_4 borderradius_22 half_horizontalmar mar_l25 mar_r25">
            <span className={`maskicon_${e} back_black_o3 iconsize_20 maxedcorebox_x3 `} />
          </span>
        ))}
      </div>
      <div className="corebox_0" />
      {modes[mode]}
      <button type="button" className="corebox_1 row items_center corebox_x8 center f_0 btn_u" data-testid="Cellitemdisplay_previewtbtn" onClick={() => handleClick('Preview', payload)}>Preview</button>
    </div>
  );
}

Cellitemdisplay.propTypes = {
  handleClick: PropTypes.func.isRequired,
  marginh: PropTypes.number.isRequired,
  marginv: PropTypes.number.isRequired,
  item: PropTypes.shape({
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  picture: PropTypes.shape({
    pictureid: PropTypes.string.isRequired,
  }).isRequired,
};
