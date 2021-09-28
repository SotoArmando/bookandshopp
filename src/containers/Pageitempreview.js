import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { dbkeys, fetcher } from "../fetch";
import { createMapDispatchtoProps } from "../reducers/createDefaultreducer";

function Pageitempreview({ upstreamUser }) {
    let { id } = useParams();
    if (isNaN(id)) { throw 'Pageitempreview: id is not an number' }
    let [state, setState] = useState({ model: 0, year: 0, pictureid: 0 });
    let { model,
        year,
        pictureid } = state;
    const { "Return item picture using id": url0, items_crud: url1 } = dbkeys
    useEffect(() => {
        fetcher(url1 + `/${id}`, (c) => {
            setState(c)
        }).fetch()
    }, [])
    return [<div data-testid='Pageitempreview' className="col center ">
        <span className="allsize corebox_15 mobilecorebox_13 contain norepeat" style={{
            backgroundImage: `url(${url0(pictureid)})`
        }} />
    </div>,
    <div className="absolute mobilehide right bodyheight back_2 corebox_x15 col border_l3 pad_22 pad_l0 pad_r33">
        <div className="corebox_2" />
        <div className="col center corebox_9">
            {
                Object.entries({
                    "VESPA 946": "f_4 corebox_2 row items_center pad_l22",
                    "$453 deposit upon any Vespa purchase": "corebox_0 row items_center pad_l22 f600"
                }).map(([k, v]) => <div className={v}>{k}</div>)
            }
        </div>
        {
            Object.entries({
                "Finance fee_$129": "corebox_0 back_black_o0",
                "Option to purchase fee_$129": "corebox_0  ",
                "Total ammount payable_$9,879": "corebox_0 back_black_o0",
                "Duration_48 Months": "corebox_0 ",
            }).map(([k, v]) => (k.indexOf('_') != -1 ? <div className={v + ' row space_between items_center pad_l22'}>{k.split('_').map(e => <span>{e}</span>)}</div> : <div className={v}>{k}</div>))
        }
        <div className="corebox_0 pad_l22">
            <span className="f700">5.9% APR</span> Representative
            </div>
        <div className="center col">
            <div className="corebox_0 row items_center pad_l22">Discover more models</div>
            <div className="row center corebox_12">
                <div className="row gbasis_31 half_horizontalmar half_verticalmar nmar_l22 nmar_r22 nmar_t22 nmar_b22 corebox_x9 ">
                    {
                        ["8E9C4C", "298057", "2B70A8", "80588F", "B01641", "B75382", "E74444", "FC8D36", "FCB442", "FFFFFF"].map(e =>
                            <span className="row border_3 allsize corebox_2 half_horizontalmar half_verticalmar mar_r22 mar_l22 mar_b22 mar_t22 borderradius_17" style={{ backgroundColor: "#" + e }} />)
                    }
                </div>
            </div>
        </div>
        <div className="row items_center end corebox_7 ">
            <div className="corebox_x10 back_green_a1 corebox_2 center  borderradius_21 fore_10">
                Configure
            </div>
        </div>
    </div>,

    <div className="desktophide col">
        <div className="corebox_2" />
        <div className="col center corebox_9">
            {
                Object.entries({
                    "VESPA 946": "f_4 corebox_2 row items_center pad_l22",
                    "$453 deposit upon any Vespa purchase": "corebox_0 row items_center pad_l22 f600"
                }).map(([k, v]) => <div className={v}>{k}</div>)
            }
        </div>
        {
            Object.entries({
                "Finance fee_$129": "corebox_0 back_black_o0",
                "Option to purchase fee_$129": "corebox_0  ",
                "Total ammount payable_$9,879": "corebox_0 back_black_o0",
                "Duration_48 Months": "corebox_0 ",
            }).map(([k, v]) => (k.indexOf('_') != -1 ? <div className={v + ' row space_between items_center pad_l22 pad_r22'}>{k.split('_').map(e => <span>{e}</span>)}</div> : <div className={v}>{k}</div>))
        }
        <div className="corebox_0 pad_l22">
            <span className="f700">5.9% APR</span> Representative
            </div>
        <div className="center col">
            <div className="corebox_0 row items_center pad_l22 ">Discover more models</div>
            <div className="row center corebox_12">
                <div className="row gbasis_31 half_horizontalmar half_verticalmar nmar_l22 nmar_r22 nmar_t22 nmar_b22 corebox_x9 ">
                    {
                        ["8E9C4C", "298057", "2B70A8", "80588F", "B01641", "B75382", "E74444", "FC8D36", "FCB442", "FFFFFF"].map(e =>
                            <span className="row border_3 allsize corebox_2 half_horizontalmar half_verticalmar mar_r22 mar_l22 mar_b22 mar_t22 borderradius_17" style={{ backgroundColor: "#" + e }} />)
                    }
                </div>
            </div>
        </div>
        <div className="row items_center end corebox_7 ">
            <div className="corebox_x10 back_green_a1 corebox_2 center  borderradius_21 fore_10">
                Configure
            </div>
        </div>
    </div>]
}

const mapStatetoProps = ({ appstate: { bookcart, shopcart }, session: { activesession } }) => ({ bookcart, shopcart, activesession });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pageitempreview);