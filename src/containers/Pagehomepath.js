import { connect } from 'react-redux';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellitemdisplay from '../components/Cellitemdisplay'
import Wrappedrowlist from '../components/Wrappedrowlist'
import { useHistory } from 'react-router';

function Pagehomepath({appstate: { data }, u_appstate,u_Pagehomepath,bookcart,shopcart,upstreamUser,activesession}) {
    
    const history = useHistory();

    function handleItemsClick(operation, {
        make,
        model,
        year,
        id,
        pictureid}) {
        
        const {id:sessionid} = activesession
        

        switch(operation) {
            case "Preview":
                history.push("/preview/"+id)
                break;
            case "Add to Cart":
                console.log(id)
                u_appstate("shopcart", [...shopcart,id])
                upstreamUser(sessionid,{...activesession,bookcart,shopcart:[...shopcart,id]})
                break;
            case "Add to Booking":
                u_appstate("bookcart", [...bookcart,id])
                upstreamUser(sessionid,{...activesession,shopcart,bookcart:[...bookcart,id]})
                break;
            case "Add to Booking":
                u_appstate("bookcart", [...bookcart,id])
                upstreamUser(sessionid,{...activesession,shopcart,bookcart:[...bookcart,id]})
                break;
        }
    }
    return <div className="">
        <Wrappedrowlist 
        className="center"
        handleClick={handleItemsClick}
        item={Cellitemdisplay} list={data}
        basis={43}
        marginh={22}
        marginv={22}/>
    </div>
}

const mapStatetoProps = ({ appstate: { bookcart, shopcart },session:{activesession} }) => ({ bookcart,shopcart,activesession });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagehomepath);
