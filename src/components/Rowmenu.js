import Colummenu from "./Columnmenu"

export default function Rowmenu() {
    const paths = Object.entries({
        "sign": "",
    })

    return <div className="nav row space_between back_4">
        <div>
            <Colummenu/>
        </div>
        <div>
        {
            paths.map(([k]) => <div className="corebox_0 row items_center  f600 f_2">{k}</div>)
        }
        </div>
    </div>
}