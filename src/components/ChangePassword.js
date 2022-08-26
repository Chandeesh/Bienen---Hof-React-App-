import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { verifyPassword } from "../actions/auth";

const ChangePassword = (props) => {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const emailId = new URLSearchParams(search).get('emailId');
    const { message } = useSelector(state => state.message);

    const verifyPwd = () => {
        dispatch(verifyPassword(token))
            .then(() => {
              props.history.push("/changepwdform?emailId="+emailId);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {
        // Update the document title using the browser API
        verifyPwd();
    }, []);

    return (
        <div class="container">  {message && (
            <div className="form-group" style={{ paddingTop: '15px' }}>
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        )}
        </div>
    );
};
export default ChangePassword;