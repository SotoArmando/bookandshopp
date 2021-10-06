/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Colummenu() {
  const [active, setActive] = useState(false);
  const menubtn = <div role="button" aria-hidden="true" onClick={() => setActive(!active)} tabIndex={0} className="corebox_2 row items_center pad_l22">Menu</div>;
  const history = useHistory();

  const paths = Object.entries({
    Models: '/',
    Shop: '/shop',
    Testdrive: '/book',
  });

  const handleItemClick = (path) => {
    history.push(path);
    setActive(false);
  };

  return [
    <div key="Colummenu0" className=" row  space_between ">{menubtn}</div>,
    <div key="Colummenu1" className={`mobilehide col nav_col_0 bodyheight ${active ? 'active' : ''} p corebox_x14 back_2 border_r3 `}>

      <div className="row space_between">
        {menubtn}
        <span role="button" aria-hidden="true" onClick={() => setActive(!active)} className="corebox_2 center maxedcorebox_x4">O/C</span>
      </div>
      <div className="col space_between allsize">
        <div className="f_5 ffam_opensans f700 pad_l30">
          Vespa
        </div>
        <div className="corebox_11 col center items_start pad_l30 back_2 ">
          {
            paths.map(([k, v]) => (
              [
                <input key={`Columenupaths${k}`} type="radio" id={k} name="Colummenupaths" value={k} className="" />,
                <label key={`Columnmenu${k}`} aria-hidden="true" htmlFor={k} for={k} className="corebox_3 ffam_inter  row items_center ls_25 f700 f_3 btn_u pad_l22" onClick={() => history.push(v)}>
                  {k.toUpperCase()}
                </label>,
              ]
            ))
        }
        </div>
        <div className="f_5 ffam_opensans f700 ">
          <div className="row center corebox_7">
            {['twitter', 'facebook', 'google', 'instagram', 'path'].map((e) => (
              <span key={e} className="corebox_2 maxedcorebox_x2 center  borderradius_22 half_horizontalmar mar_l25 mar_r25">
                <span className={`maskicon_${e} back_black_o2 iconsize_23 maxedcorebox_x2 `} />
              </span>
            ))}
          </div>
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
      </div>

    </div>,
  ];
}
