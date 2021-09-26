import { useState } from "react"
import { useHistory } from "react-router-dom";

export default function Colummenu() {
    let [active,setActive] = useState(false);
    let menubtn = <div onClick={() => setActive(!active)} className="corebox_2 row items_center pad_l22">Menu</div>;
    let history = useHistory();

    const paths = Object.entries({
        "Models": "/",
        "Shop": "/shop",
        "Testdrive": "/book"
    })  
    return [
    <div className=" row  space_between ">{menubtn}</div>,
    <div className={`mobilehide col nav_col_0 bodyheight ${active ? "active" : ""} p corebox_x14 back_2 border_r3 `}>
        <div className="row space_between">{menubtn}<span onClick={() => setActive(!active)} className="corebox_2 center maxedcorebox_x4">O/C</span></div>
        <div className="corebox_11 col center items_start pad_l30 back_2 bodyheight">
        {
            paths.map(([k,v]) => [
                <input type="radio" id={k} name="Colummenupaths" value={k} className=""/>,
                <label for={k} className="corebox_2 row items_center  f500 f_2 btn_u pad_l22" onClick={() => history.push(v)}>{k}</label>])
        }
        </div>
        
    </div>,
    <div className={`desktophide col nav_col_0d ${active ? "active" : ""} p allsize back_2 border_r3 `}>
    <div className="row space_between">{menubtn}<span onClick={() => setActive(!active)} className="corebox_2 center maxedcorebox_x4">O/C</span></div>
    <div className="corebox_11 col center items_start pad_l30 ">
    {
        paths.map(([k,v]) => [
            <input type="radio" id={'m'+k} name="Colummenupaths" value={k} className=""/>,
            <label for={'m'+k} className="corebox_2 row items_center  f500 f_2 btn_u pad_l22" onClick={() => history.push(v)}>{k}</label>])
    }
    </div>
    
</div>
]
}