import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};
const AuthVerify = (props) => {

    props.history.listen(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const decodedJwt = parseJwt(user.token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                props.logOut();
                toast("Session Timed Out! Please Login Again");
            }
        }
    });
    return <div> 
    </div>;
};
export default withRouter(AuthVerify);