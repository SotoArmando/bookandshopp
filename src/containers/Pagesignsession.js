import { connect } from 'react-redux';
import { createMapDispatchtoProps } from '../reducers/createDefaultreducer';
import Cellitemdisplay from '../components/Cellitemdisplay'
import Wrappedrowlist from '../components/Wrappedrowlist'
import Forminput from '../components/Forminput'
import {newuser,newsession} from '../res/formsetup'
import { useState } from 'react';
import { dbkeys, fetcher } from '../fetch';
import { useHistory, useLocation } from 'react-router';

function Pagesignsession({appstate: { data }, u_appstate,u_Pagehomepath,bookcart,shopcart, u_session}) {

    let [sign,setSign] = useState(false);
    let history = useHistory();

    function handleResponse({status,bookcart,shopcart,id},payload) {
        const {user} = payload;
        if (status === "Succesfully Authenticated") {
            u_appstate("bookcart", bookcart)
            u_appstate("shopcart", shopcart)
            u_session('active', true)
            u_session('activesession', {
                user,
                bookcart: bookcart,
                shopcart: shopcart,
                id
            })
            history.push("/");
        } else {

        }
    }
    
    function handleClick(operation, payload) {
        const { user,password } = payload;
        

        const {users_crud:url0, sessions_crud: url1} = dbkeys;

        switch(operation) {
            case "Sign up":
                fetcher(url0,(c) => handleResponse(c,payload)).fetchcrudOperation("POST",{user:payload})
                break;      
            case "Sign in":
                fetcher(url1,(c) => handleResponse(c,payload)).fetchcrudOperation("POST",{user:payload})
                break;
        }
    }
    return <div >
        <div className="center col">
            <div className="maxedcorebox_x18">
                <span className="f_2 corebox_3 row items_center">Welcome</span>
                <Forminput entries={sign ? newuser : newsession} id="Signform" handleCapture={(c) => handleClick(sign ? "Sign up" : "Sign in",c)}/>
                <button className="corebox_2 center" onClick={() =>setSign(!sign)}>Switch between sign in and sign up</button>
                <button
                form="Signform"
                type="submit"
                value="Submit"
                className="corebox_2 border_0 back_0 btn_u f_0"
                >
                Submit Signform
                </button>
            </div>
        </div>
    </div>
}

const mapStatetoProps = ({ appstate: { bookcart, shopcart } }) => ({ bookcart,shopcart });
const mapDispatchtoProps = createMapDispatchtoProps();

export default connect(mapStatetoProps, mapDispatchtoProps)(Pagesignsession);
