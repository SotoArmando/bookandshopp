import { connect } from 'react-redux';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellcart from "./Cellcart"
import Colummenu from "../components/Columnmenu"
import { useHistory } from 'react-router';

function Rowmenu({ bookcart,shopcart,u_appstate,u_session,activesession,active,upstreamUser }) {

    let history = useHistory();
    
    function handleCartClick(operation,id) {
        
        switch(operation) {
            case "Remove from shopcart":
                u_appstate("shopcart",shopcart.filter((e) => e !== id))
                upstreamUser(activesession.id, {shopcart: shopcart.filter((e) => e !== id)})
                break;
            case "Remove from bookcart":
                u_appstate("bookcart",bookcart.filter((e) => e !== id))
                upstreamUser(activesession.id, {bookcart: bookcart.filter((e) => e !== id)})
                break;
        }
    }

    function handleRowmenuClick(k) {
        
        switch(k){
            case "Sign out":
                u_appstate("bookcart",[])
                u_appstate("shopcart",[])
                u_session("active", false)
                u_session("activesession",{
                    id: 0,
                    user: undefined,
                    bookcart: [],
                    shopcart: []
                })
                break;
            default:
                history.push(k);
                break;
        }
    }
 
    const paths = Object.entries({
        "Home": "/",
        [`${active ? "Sign out": "Sign"}`]: "/sign",
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
                paths.map(([k,v]) => [
                <input type="radio" id={k} name="Rowmenupaths" value={k}  className="hide"/>,
                <label for={k} className="corebox_2 row items_center corebox_x5 center f_1 btn_u" onClick={() => handleRowmenuClick(k)}>{k}</label>])
            }
        </div>
    </div>
    ]
}

const mapStatetoProps = ({ appstate: { bookcart,shopcart },session:{activesession,active} }) => ({ bookcart,shopcart,activesession,active });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Rowmenu);