/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unknown-property */
// None of the samples at
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/control-has-associated-label.md
// currently gives a succesfull code
import { useState } from 'react';
import PropTypes from 'prop-types';
import Rowitemcartdisplay from '../components/Rowitemcartdisplay';
import Wrappedrowlist from '../components/Wrappedrowlist';

function Cellcart({ handleClick, bookcart, shopcart }) {
  const [activetab, setActivetab] = useState(0);

  return [
    <div key="Cellcart0" className=" corebox_2 mobilehide" data-testid="Cellcart">
      <input type="checkbox" id="cart" name="Rowmenudynamiccart" value="x" className="cart hide" />
      <label htmlFor="cart" for="cart" className="corebox_4 row items_center corebox_x8 center f_0 btn_u">
        Cart
      </label>
      <div className="absolute   mar_t35">
        <div className=" back_2 corebox_17 border_3  pad_b22 col space_between items_center">
          <div className="row gbasis_30 corebox_3 items_center">
            {/* Enables the use of remote labels
            using clean css approach to switch from tabs */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="Shopping" for="Shopping" className={`btn_u pad_l22 center corebox_3 ${activetab === 0 ? 'active_0' : ''}`} onClickCapture={() => { setActivetab(0); }}>Shopping</label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="Book" for="Book" className={`btn_u pad_l22 center corebox_3 ${activetab === 1 ? 'active_0' : ''}`} onClickCapture={() => { setActivetab(1); }}>Book</label>
          </div>
          <input type="radio" id="Book" name="Cellcart" value="Book" className="cart0 hide" defaultChecked={activetab === 1} />
          <div className="allsize">
            <Wrappedrowlist basis={51} testid="Bookwrappedrowlist" item={Rowitemcartdisplay} handleClick={(id, index) => handleClick('Remove from bookcart', id, index)} list={bookcart} g="g" />
            {bookcart.length > 0
              ? <label aria-hidden="true" htmlFor="cart" for="cart" className="corebox_2 row center btn_u back_green_o0 fore_9" onClick={() => handleClick('Push to configure')}>Continue to Configure</label>
              : []}
          </div>
          <input type="radio" id="Shopping" name="Cellcart" value="Shopping" className="cart0 hide" defaultChecked={activetab === 0} />
          <div className="allsize">
            <Wrappedrowlist basis={51} testid="Shopwrappedrowlist" item={Rowitemcartdisplay} handleClick={(id, index) => handleClick('Remove from shopcart', id, index)} list={shopcart} g="g" />
            {shopcart.length > 0
              ? <label aria-hidden="true" htmlFor="cart" for="cart" className="corebox_2 row center btn_u back_green_o0 fore_9" onClick={() => handleClick('Push to checkout')}>Continue to Checkout</label>
              : []}
          </div>
          {/* Enables the use of remote labels
            using clean css approach to close cart */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="cart" for="cart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u">Close</label>
        </div>
      </div>
    </div>,
    <div key="Cellcart1" className=" corebox_2 desktophide">
      <input type="checkbox" id="mcart" name="Rowmenudynamicmcart" value="x" className="cart hide" />
      <label htmlFor="mcart" for="mcart" className="corebox_4 row items_center corebox_x8 center f_0 btn_u">
        Cart
      </label>
      <div className="absolute  center  mar_t35">
        <div className=" back_2 corebox_17 border_3 pad_b22 col space_between">
          <div className="row gbasis_30 corebox_3 items_center">
            {/* Enables the use of remote labels
            using clean css approach to switch from tabs */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="mShopping" for="mShopping" className={`btn_u pad_l22 center corebox_3 ${activetab === 0 ? 'active_0' : ''}`} onClickCapture={() => { setActivetab(0); }}>Shopping</label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="mBook" for="mBook" className={`btn_u pad_l22 center corebox_3 ${activetab === 1 ? 'active_0' : ''}`} onClickCapture={() => { setActivetab(1); }}>Book</label>
          </div>
          <input type="radio" id="mBook" name="Cellmcart" value="mBook" className="cart0 hide" defaultChecked={activetab === 1} />
          <div className="col">
            <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick('Remove from bookcart', id)} list={bookcart} g="g" />
            {bookcart.length > 0
              ? <label className="corebox_2 row center btn_u back_green_o0 fore_9">Continue to Configure</label>
              : []}
          </div>
          <input type="radio" id="mShopping" name="Cellmcart" value="mShopping" className="cart0 hide" defaultChecked={activetab === 0} />
          <div className="col">
            <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick('Remove from shopcart', id)} list={shopcart} g="g" />
            {shopcart.length > 0
              ? <label className="corebox_2 row center btn_u back_green_o0 fore_9">Continue to Checkout</label>
              : []}
          </div>
          {/* Enables the use of remote labels
            using clean css approach to close cart */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="mcart" for="mcart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u">Close</label>
        </div>
      </div>
    </div>,
  ];
}

Cellcart.propTypes = {
  handleClick: PropTypes.func,
  bookcart: PropTypes.arrayOf(PropTypes.number),
  shopcart: PropTypes.arrayOf(PropTypes.number),
};

Cellcart.defaultProps = {
  handleClick: () => 0,
  bookcart: [],
  shopcart: [],
};

export default Cellcart;
