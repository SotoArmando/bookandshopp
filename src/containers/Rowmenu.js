import { connect } from 'react-redux';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellcart from "./Cellcart"
import Colummenu from "../components/Columnmenu"

function Rowmenu({ bookcart,shopcart,u_appstate }) {
    debugger;
    function handleCartClick(operation,id) {
        debugger;
        switch(operation) {
            case "Remove from shopcart":
                u_appstate("shopcart",shopcart.filter(({id:e_id}) => e_id !== id))
                break;
            case "Remove from bookcart":
                u_appstate("bookcart",bookcart.filter(({id:e_id}) => e_id !== id))
                break;
        }
    }

    const paths = Object.entries({
        "home": "",
        "sign": "",
    })

    return [
    <div className="corebox_2"></div>,
    <div className="nav corebox_2 row space_between items_center back_2 border_b3 " >
        <div>
            <Colummenu/>
        </div>
        <div className="row">
            <Cellcart handleClick={handleCartClick} bookcart={bookcart} shopcart={shopcart} />
            {
                paths.map(([k]) => [
                <input type="radio" id={k} name="Rowmenupaths" value={k}  className="hide"/>,
                <label for={k} className="corebox_2 row items_center corebox_x5 center f_1 btn_u">{k}</label>])
            }
        </div>
    </div>
    ]
}

const mapStatetoProps = (state) => {
    const {bookcart,shopcart} = state.appstate;
    console.log(state)
    return ({ bookcart,shopcart })
};
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Rowmenu);