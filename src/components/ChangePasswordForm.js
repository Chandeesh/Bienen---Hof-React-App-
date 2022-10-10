import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updatePassword } from "../actions/auth";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePasswordForm = (props) => {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const emailId = new URLSearchParams(search).get('emailId');
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation() // Also works 😉

    const handleSubmitPwd = (e) => {
        e.preventDefault();
        console.log("About to call update password");
        dispatch(updatePassword(emailId, password))
            .then(() => {
                toast("Your password has been changed!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    });
                props.history.push("/login");
            })
            .catch((err) => {
            });
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    return (

        <div>
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleSubmitPwd}>
                    <div className="form-group">
                        <label htmlFor="username">{t("password")}</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm-password">{t("confirmPassword")}</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                    </div>
                    <div className="form-group" >
                        <label htmlFor="username"></label>
                        <button className="btn btn-warning btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-grow-sm"></span>
                            )}{'     '}
                            <span>{t("submit")}</span>
                        </button>
                    </div>
                    {(password !== confirmPassword) ? <div className="form-group" style={{ paddingTop: '15px' }}>
                        <div className="alert alert-danger" role="alert">
                            Passwords do not match
                        </div>
                    </div> : <></>

                    }
                </Form>
                
            </div>
        </div>


    );
};
export default ChangePasswordForm;