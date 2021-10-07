/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Colummenu({ handleColumnMenuisOpenSwitch }) {
  const [active, setActive] = useState(false);
  const menubtn = (
    <div role="button" aria-hidden="true" onClick={() => setActive(handleColumnMenuisOpenSwitch())} tabIndex={0} className="corebox_4 corebox_x3 row items_center pad_l22">
      <span className="maskicon_menu iconsize_21" />
    </div>
  );
  const history = useHistory();

  const paths = Object.entries({
    Models: '/',
    Lifestyle: '/style',
    Shop: '/shop',
    'Test Drive': '/book',
  });

  const handleItemClick = (path) => {
    history.push(path);
    setActive(handleColumnMenuisOpenSwitch(false));
  };

  return [
    <div key="Colummenu0" className=" row  space_between ">{menubtn}</div>,
    <div key="Colummenu1" className={`mobilehide col nav_col_0 bodyheight ${active ? 'active' : ''} p corebox_x14 back_2 border_r3 `}>
      <div className="row space_between corebox_0" />
      <div className="col space_between allsize">
        <div className="f_5 ffam_opensans f700 pad_l30 row start items_center maxedcorebox_5">
          <span className="svgicon_vespa b0 iconsize_34 " />
        </div>
        <div className="corebox_11 col center items_start pad_l30 back_2 ">
          {
            paths.map(([k, v]) => (
              [
                <input key={`Columenupaths${k}`} type="radio" id={k} name="Colummenupaths" value={k} className="" />,
                <label key={`Columnmenu${k}`} aria-hidden="true" htmlFor={k} for={k} className="corebox_4 ffam_inter  row items_center ls_25 f700 f_2 btn_u pad_l22" onClick={() => handleItemClick(v)}>
                  {k.toUpperCase()}
                </label>,
              ]
            ))
        }
        </div>
        <div className="col">
          <div className="f_5 ffam_opensans f700 ">
            <div className="row center corebox_2">
              {['twitter iconsize_21', 'facebook iconsize_22', 'google iconsize_21', 'instagram iconsize_23', 'path iconsize_21'].map((e) => (
                <span key={e} className="corebox_1 maxedcorebox_x2 center  borderradius_22 half_horizontalmar ">
                  <span className={`maskicon_${e} back_black   maxedcorebox_x2 `} />
                </span>
              ))}
            </div>
          </div>
          <div className="row center corebox_7">
            <span className="corebox_2 center maxedcorebox_x13 tcenter f700 ls_34">C SOTOARMANDO 2021 & C.S.P.A - P.I.V.A</span>
          </div>
          <div className="corebox_0" />
        </div>

      </div>
    </div>,
    <div key="Colummenu2" className={`desktophide col nav_col_0d ${active ? 'active' : ''} p allsize back_2 border_r3 `}>
      <div className="row space_between">
        {menubtn}
        <span aria-hidden="true" onClick={() => setActive(!active)} className="corebox_2 center maxedcorebox_x4">O/C</span>
      </div>
      <div className="corebox_11 col center items_start pad_l30 ">
        {
        paths.map(([k, v]) => (
          <label key={`Columnmenu${k}`} aria-hidden="true" htmlFor={`m${k}`} for={`m${k}`} className="corebox_2  row items_center  f500 f_2 btn_u pad_l22" onClick={() => handleItemClick(v)}>
            <input type="radio" id={`m${k}`} name="Colummenupaths" value={k} className="hide" />
            {k}
          </label>
        ))
    }
        <div className="row center">
          C SOTOARMANDO 2021 \& C.S.P.A - P.I.V.A
        </div>
      </div>

    </div>,
  ];
}

Colummenu.propTypes = {
  handleColumnMenuisOpenSwitch: PropTypes.func.isRequired,

};
