import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import Rowitemcartdisplay from "../components/Rowitemcartdisplay"
import Wrappedrowlist from "../components/Wrappedrowlist"

function Cellcart({handleClick,bookcart,shopcart}) {
    const [mode,setMode] = useState(0)
        
    let location = useLocation();
    let [activetab,setActivetab] = useState(0)
    useEffect(() => {
        setMode(["/","/book","/shop"].indexOf(window.location.pathname))
    }, [location]);

    return <div className="relative corebox_2 ">
        <input type="checkbox" id="cart" name="Rowmenudynamiccart" value="x" className="cart hide" />
        <label for="cart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u" >Book and Cart</label>
        <div className="absolute  center  mar_t33">
            <div className="corebox_x13 back_2 corebox_14 border_3 pad_t22 pad_b22 col ">
            <span>Book and Cart</span>
            <div className="row gbasis_30 corebox_3 items_center">
                <label for="Shopping" className={`btn_u pad_l22 center corebox_3 ${activetab === 0 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(0)}} >Shopping</label>
                <label for="Book" className={`btn_u pad_l22 center corebox_3 ${activetab === 1 ? 'active_0' : ''}`} onClickCapture={() => {setActivetab(1)}} >Book</label>
            </div>
            <input type="radio" id="Book" name="Cellcart" value="Book" className="cart0 hide" checked={activetab === 1}/>
            <div className="">
                Booking list:
                <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from bookcart", id)} list={bookcart} g="g" />    
            </div>
            <input type="radio" id="Shopping" name="Cellcart" value="Shopping" className="cart0 hide" checked={activetab === 0}/>
            <div className="">
                Shopping list:
                <Wrappedrowlist item={Rowitemcartdisplay} handleClick={(id) => handleClick("Remove from shopcart", id)}  list={shopcart} g="g" />    
            </div>            
            <label for="cart" className="corebox_2 row items_center corebox_x8 center f_1 btn_u" >Close</label>
            </div>
        </div>
    </div>
}
export default Cellcart;