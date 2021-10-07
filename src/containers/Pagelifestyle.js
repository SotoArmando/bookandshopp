import PropTypes from 'prop-types';
import Wrappedrowlist from '../components/Wrappedrowlist';

export default function Pagelifestyle({ children }) {
  const list = [0, 1, 2].map((e, i) => [
    [0, {
      back: 'back_lifestyle_0',
      text: 'heritage',
    }, 1],
    [{
      back: 'back_lifestyle_1',
      text: 'the love',
    }, 2, {
      back: 'back_lifestyle_2',
      text: 'roma streets',
    }],
    [3, {
      back: 'back_lifestyle_3',
      text: 'prestige',
    }, 4]][i]);

  const squareElement = ({ id }) => (
    <div key={id} className="row gbasis_43">
      {id.map((e) => (
        e.text ? (
          <div key={e} className={`col corebox_12 mobilecorebox_13 corebox_x12 transparent ${e.back} center cover fore_10 f_2 ls_38 f600 ffam_inter`}>
            <span className="center corebox_7">{e.text.toUpperCase()}</span>
            <span className="maskicon_play back_2 iconsize_26" />
          </div>
        ) : (
          <div key={e} className={`col corebox_12 mobilecorebox_13  transparent pic_lifestylepic_${e} center cover`} />
        )

      ))}
    </div>
  );
  return (
    [children,
      <div key="Pagelifestyle" className="allsize center">
        <div className="maxedcorebox_x20 center corebox_19 pad_l33 pad_r33 ">
          <Wrappedrowlist list={list} item={squareElement} g="g" className="boxshadow_33" />
        </div>
      </div>,
    ]
  );
}

Pagelifestyle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
