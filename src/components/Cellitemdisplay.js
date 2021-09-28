import { useEffect, useState } from "react"
import { useLocation } from "react-router";
import { dbkeys, fetcher } from "../fetch";

export default function Cellitemdisplay({
    handleClick,
    duration,
    make,
    model,
    year,
    id,
    pictureid,
    created_at,
    marginh,
    marginv}) {
    const payload= {make,model,year,pictureid,id}
    const{ "Return item picture using id": url0 } = dbkeys  

    const [mode,setMode] = useState(0)
        
    let location = useLocation();
    
    useEffect(() => {
        setMode(["/","/book","/shop"].indexOf(location.pathname))
    }, [location]);

    let modes = [
        [],
        [<input type="checkbox" id={pictureid} name="Rowmenudynamiccart" value="x" className="hide" />,
        <label for={pictureid} className="corebox_2 row items_center corebox_x8 center f_1 btn_u" data-testid="Cellitemdisplay_checkbtn"  onClick={()=> handleClick("Add to Booking",payload)}>Check</label>],
        <button className="corebox_2 row items_center corebox_x8 center f_1 btn_u" data-testid="Cellitemdisplay_addtocartbtn" onClick={()=> handleClick("Add to Cart",payload)} >Add to Cart</button>
    ]
    
    return <div key={'Cellitemdisplay'+id} data-testid="Cellitemdisplay" className={`col back_3 borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
        <div className="corebox_11 cover" style={{
            backgroundImage:`url(${url0(pictureid)})`
        }}/>
        <div className="col pad_20">
            <div>{model} - {year}</div>
        </div>
        {modes[mode]}
        <button className="corebox_2 row items_center corebox_x8 center f_1 btn_u" data-testid="Cellitemdisplay_previewtbtn" onClick={()=> handleClick("Preview",payload)} >Preview</button>
    </div>
}