import { connect } from 'react-redux';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellitemdisplay from '../components/Cellitemdisplay'
import Wrappedrowlist from '../components/Wrappedrowlist'

function Pagehomepath({appstate: { data }, u_appstate,u_Pagehomepath,bookcart,shopcart}) {
    debugger;
    function handleItemsClick(operation, {
        make,
        model,
        year,
        id,
        pictureid}) {
        debugger;
        switch(operation) {
            case "Preview":
                u_Pagehomepath("previewid", id)
                break;
            case "Add to Cart":
                u_appstate("bookcart", [...bookcart,{make,model,year,id,pictureid}])
                break;
            case "Add to Booking":
                u_appstate("shopcart", [...shopcart,{make,model,year,id,pictureid}])
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

const mapStatetoProps = ({ appstate: { bookcart, shopcart } }) => ({ bookcart,shopcart });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagehomepath);
