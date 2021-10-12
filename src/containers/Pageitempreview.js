import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { dbkeys, fetcher } from '../fetch';

function Pageitempreview({ children }) {
  const { id } = useParams();
  // Enables the use Is not an number to check id passed to the view both using routes or methods
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(id)) { throw new Error('Pageitempreview: id is not an number'); }
  const [state, setState] = useState({ });
  const {
    pictureid,
  } = state;
  const { 'Return item picture using id': url0, items_crud: url1 } = dbkeys;
  useEffect(() => {
    fetcher(`${url1}/${id}`, ({ item, picture: { pictureid } }) => {
      setState({ ...item, pictureid });
    }).fetch();
  }, []);
  return [
    <div key="Pageitempreview0" data-testid="Pageitempreview" className="col allsize ">
      {children}
      <div className="pad_22 allsize corebox_16 mobilecorebox_13 col">
        <span
          className="allsize  corebox_16  mobilecorebox_13 contain norepeat"
          style={{
            backgroundImage: `url(${url0(pictureid)})`,
          }}
        />
      </div>
    </div>,
    <div key="Pageitempreview1" className="absolute mobilehide right bodyheight back_2 corebox_x16 col border_l3 pad_22 pad_l0  items_center">
      <div className="corebox_2" />
      <div className="col center corebox_10">
        {
                Object.entries({
                  'VESPA 946': 'f_5 corebox_2 row items_center pad_l22',
                  '$453 deposit upon any Vespa purchase': 'corebox_0 row items_center pad_l22 f600',
                }).map(([k, v]) => <div key={`Pageitempreview1_details0${k}`} className={v}>{k}</div>)
            }
      </div>
      {
            Object.entries({
              'Finance fee_$129': 'corebox_0 back_black_o0',
              'Option to purchase fee_$129': 'corebox_0  ',
              'Total ammount payable_$9,879': 'corebox_0 back_black_o0',
              'Duration_48 Months': 'corebox_0 ',
            }).map(([k, v]) => (k.indexOf('_') !== -1 ? <div className={`${v} row space_between items_center pad_l22`}>{k.split('_').map((e) => <span key={`Pageitempreview1_details1${k}`}>{e}</span>)}</div> : <div className={v}>{k}</div>))
        }
      <div className="corebox_0 pad_l22">
        <span className="f700">5.9% APR</span>
        {' '}
        Representative
      </div>
      <div className="center col">
        <div className="corebox_0 row items_center pad_l22">Discover more models</div>
        <div className="row center corebox_12">
          <div className="row gbasis_31 half_horizontalmar half_verticalmar nmar_l22 nmar_r22 nmar_t22 nmar_b22 corebox_x9 ">
            {
                        ['8E9C4C', '298057', '2B70A8', '80588F', 'B01641', 'B75382', 'E74444', 'FC8D36', 'FCB442', 'FFFFFF'].map((e) => <span key={`Pageitempreview1_colors0${e}`} className="row  allsize corebox_2 half_horizontalmar half_verticalmar " style={{ backgroundColor: `#${e}` }} />)
                    }
          </div>
        </div>
      </div>
      <div className="row items_center end maxedcorebox_x15 space_between">
        <div className="corebox_x10 back_green_o0 corebox_3 center f_1 borderradius_23 fore_9 btn_u">
          Add to Cart
        </div>
        <div className="corebox_x10 back_green_o0 corebox_3 center f_1 borderradius_23 fore_9 btn_u">
          Configure
        </div>
      </div>
    </div>,

    <div key="Pageitempreview2" className="desktophide col">
      <div className="col center corebox_9">
        {
                Object.entries({
                  'VESPA 946': 'f_4 corebox_2 row items_center pad_l22',
                  '$453 deposit upon any Vespa purchase': 'corebox_0 row items_center pad_l22 f600',
                }).map(([k, v]) => <div key={`mPageitempreview1_details0${k}`} className={v}>{k}</div>)
            }
      </div>
      {
            Object.entries({
              'Finance fee_$129': 'corebox_0 back_black_o0',
              'Option to purchase fee_$129': 'corebox_0  ',
              'Total ammount payable_$9,879': 'corebox_0 back_black_o0',
              'Duration_48 Months': 'corebox_0 ',
            }).map(([k, v]) => (k.indexOf('_') !== -1 ? <div className={`${v} row space_between items_center pad_l22 pad_r22`}>{k.split('_').map((e) => <span key={`mPageitempreview1_details1${e}`}>{e}</span>)}</div> : <div className={v}>{k}</div>))
        }
      <div className="corebox_0 pad_l22">
        <span className="f700">5.9% APR</span>
        {' '}
        Representative
      </div>
      <div className="center col">
        <div className="corebox_0 row items_center pad_l22 ">Discover more models</div>
        <div className="row center corebox_12">
          <div className="row gbasis_31 half_horizontalmar half_verticalmar nmar_l22 nmar_r22 nmar_t22 nmar_b22 corebox_x9 ">
            {
                          ['8E9C4C', '298057', '2B70A8', '80588F', 'B01641', 'B75382', 'E74444', 'FC8D36', 'FCB442', 'FFFFFF'].map((e) => <span key={`Pageitempreview1_colors0${e}`} className="row  allsize corebox_2 half_horizontalmar half_verticalmar " style={{ backgroundColor: `#${e}` }} />)
                      }
          </div>
        </div>
      </div>
      <div className="row items_center end maxedcorebox_x14 space_between pad_20">
        <div className="corebox_x9 back_green_o0 corebox_3 center f_1 borderradius_23 fore_9 btn_u">
          Add to Cart
        </div>
        <div className="corebox_x9 back_green_o0 corebox_3 center f_1 borderradius_23 fore_9 btn_u">
          Configure
        </div>
      </div>
      <div className="corebox_1" />
    </div>];
}

Pageitempreview.propTypes = {

  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Pageitempreview;
