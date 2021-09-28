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
  return [
    <div key="Colummenu0" className=" row  space_between ">{menubtn}</div>,
    <div key="Colummenu1" className={`mobilehide col nav_col_0 bodyheight ${active ? 'active' : ''} p corebox_x14 back_2 border_r3 `}>
      <div className="row space_between">
        {menubtn}
        <span role="button" aria-hidden="true" onClick={() => setActive(!active)} className="corebox_2 center maxedcorebox_x4">O/C</span>
      </div>
      <div className="corebox_11 col center items_start pad_l30 back_2 bodyheight">
        {
            paths.map(([k, v]) => (
              <label key={`Columnmenu${k}`} aria-hidden="true" htmlFor={k} className="corebox_2 row items_center  f500 f_2 btn_u pad_l22" onClick={() => history.push(v)}>
                <input type="radio" id={k} name="Colummenupaths" value={k} className="" />
                {k}
              </label>
            ))
        }
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
          <label key={`Columnmenu${k}`} aria-hidden="true" htmlFor={`m${k}`} className="corebox_2 row items_center  f500 f_2 btn_u pad_l22" onClick={() => history.push(v)}>
            <input type="radio" id={`m${k}`} name="Colummenupaths" value={k} className="" />
            {k}
          </label>
        ))
    }
      </div>

    </div>,
  ];
}
