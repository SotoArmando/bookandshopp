import { useState } from "react"

export default function Colummenu() {
    let [active,setActive] = useState(false);
    let menubtn = <div onClick={() => setActive(!active)} className="corebox_1 row items_center">Menu</div>;


    const paths = Object.entries({
        "models": undefined,
        "shop": undefined,
        "testdrive": undefined
    })
    return [
    <div className="pad_l22 ">{menubtn}</div>,
    <div className={`col nav_col_0 ${active ? "active" : ""} pad_l22 corebox_x14 back_4 `}>
        {menubtn}
        {
            paths.map(([k]) => <div className="corebox_0 row items_center  f600 f_2">{k}</div>)
        }
    </div>
]
}