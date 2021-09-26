import { useEffect, useState } from "react"
import { useLocation } from "react-router";
import { dbkeys, fetcher } from "../fetch";

export default function Rowitemcartdisplay({
    id,
    handleClick,
    marginh,
    marginv}) {

    const{ "Return item picture using id": url0, items_crud: url1} = dbkeys
    let [state, setState] = useState({model:0,year:0,pictureid:0});

    let {model,
        year,
        pictureid} = state;

    if (year === 0) {
        fetcher(url1+`/${id}`,(c)=> {
            setState(c)
    }).fetch() }
    
    return <div className={`row back_3 borderradius_14  mar_l${marginh} mar_r${marginh} mar_t${marginv} mar_b${marginv} half_horizontalmar half_verticalmar`}>
        <div className="corebox_4 corebox_x4  cover" style={{
            backgroundImage:`url(${url0(pictureid)})`
        }}/>
        <div className="col pad_20 corebox_4">
            <div>{model} - {year}</div>
        </div>
        <button className="corebox_2 row items_center  center f_0 btn_u maxedcorebox_x5" onClick={() => handleClick(id)} >Remove</button>
    </div>
}