import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import Rowitemcartdisplay from "../components/Rowitemcartdisplay"
import Wrappedrowlist from "../components/Wrappedrowlist"
import PropTypes from 'prop-types';

function Cellcart({handleClick,bookcart,shopcart}) {
    let [activetab,setActivetab] = useState(0)

    return [
        <div className=" corebox_2 mobilehide" data-testid="Cellcart">
        <input type="checkbox" id="cart" name="Rowmenudynamiccart" value="x" className="cart hide" />
        <label for="cart" className="corebox_2 row items_center corebox_x8 center f_0 btn_u" >Cart</label>
        <div className="absolute   mar_t33">
            <div className=" back_2 corebox_17 border_3 pad_t22 pad_b22 col ">
            <span>Book and Cart</span>
            <div className="row gbasis_30 corebox_3 items_center">
                <label for="Shopping" className={`btn_u pad_l22 center corebox_3 ${activetab === 0 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(0)}} >Shopping</label>
                <label for="Book" className={`btn_u pad_l22 center corebox_3 ${activetab === 1 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(1)}} >Book</label>
            </div>
            <input type="radio" id="Book" name="Cellcart" value="Book" className="cart0 hide" defaultChecked={activetab === 1}/>
            <div className="">
                Booking list:
                <Wrappedrowlist testid='Bookwrappedrowlist' item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from bookcart", id)} list={bookcart} g="g" />    
            </div>
            <input type="radio" id="Shopping" name="Cellcart" value="Shopping" className="cart0 hide" defaultChecked={activetab === 0}/>
            <div className="">
                Shopping list:
                <Wrappedrowlist testid='Shopwrappedrowlist' item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from shopcart", id)}  list={shopcart} g="g" />    
            </div>            
            <label for="cart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u" >Close</label>
            </div>
        </div>
    </div>
        ,
    <div className=" corebox_2 desktophide">
    <input type="checkbox" id="mcart" name="Rowmenudynamicmcart" value="x" className="cart hide" />
    <label for="mcart" className="corebox_2 row items_center corebox_x8 center f_0 btn_u" >mcart</label>
    <div className="absolute  center  mar_t33">
        <div className=" back_2 corebox_17 border_3 pad_t22 pad_b22 col ">
        <span>Book and Cart</span>
        <div className="row gbasis_30 corebox_3 items_center">
            <label for="mShopping" className={`btn_u pad_l22 center corebox_3 ${activetab === 0 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(0)}} >mShopping</label>
            <label for="mBook" className={`btn_u pad_l22 center corebox_3 ${activetab === 1 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(1)}} >mBook</label>
        </div>
        <input type="radio" id="mBook" name="Cellmcart" value="mBook" className="cart0 hide" defaultChecked={activetab === 1}/>
        <div className="">
            mBooking list:
            <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from bookcart", id)} list={bookcart} g="g" />    
        </div>
        <input type="radio" id="mShopping" name="Cellmcart" value="mShopping" className="cart0 hide" defaultChecked={activetab === 0}/>
        <div className="">
            mShopping list:
            <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from shopcart", id)}  list={shopcart} g="g" />    
        </div>            
        <label for="mcart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u" >Close</label>
        </div>
    </div>
</div>
    ]
}

Cellcart.propTypes = {
    handleClick: PropTypes.func,
    bookcart: PropTypes.arrayOf(PropTypes.number).isRequired,
    shopcart: PropTypes.arrayOf(PropTypes.number).isRequired
};

Cellcart.defaultProps = {
    handleClick: () => 0,
};
  
export default Cellcart;