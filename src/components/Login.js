import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { initiateResetPassword, login } from "../actions/auth";
import { useTranslation } from 'react-i18next';
import {
  Button, Modal, Form as ModalForm
} from "react-bootstrap";
import { ToastContainer } from 'react-toastify';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = (props) => {
  const { t, i18n } = useTranslation() // Also works 😉
  const form = useRef();
  const modalForm = useRef();
  const checkBtn = useRef();
  const [emailId, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const [showResetPassword, setShowResetPassword] = useState(false);
  const handleShowResetPasswordOn = () => setShowResetPassword(true);
  const handleShowResetPasswordOff = () => setShowResetPassword(false);
  const [emailIdForgotPwd, setEmailId] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmailPwd = (e) => {
    const emailId = e.target.value;
    setEmailId(emailId);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    console.log(message);
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(emailId, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    dispatch(initiateResetPassword(emailIdForgotPwd))
      .then((res) => {
        console.log(res);
        setShowResetPassword(false)
      })
      .catch((err) => {
        console.log(err);
      });

  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">{t("username")}</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={emailId}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t("password")}</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>
          <div className="form-group" >
            <label htmlFor="password"></label>
            <a href="#">
              <div onClick={handleShowResetPasswordOn}>{t("forgotPassword")}</div></a>
            <label htmlFor="password"></label>
            <button className="btn btn-warning btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-grow-sm"></span>
              )}{'     '}
              <span>{t("login")}</span>
            </button>
          </div>
          {message && (
            <div className="form-group" style={{ paddingTop: '15px' }}>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      <Modal show={showResetPassword} onHide={handleShowResetPasswordOff}>
        <Modal.Header closeButton>
          <Modal.Title>Enter your email address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalForm ref={modalForm}>
            <ModalForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <ModalForm.Label>Email</ModalForm.Label>
              <ModalForm.Control value={emailIdForgotPwd}
                onChange={onChangeEmailPwd}
                placeholder="email address"
                autoFocus
              />
            </ModalForm.Group>
          </ModalForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleShowResetPasswordOff}>
            Close
          </Button>
          <Button variant="warning" onClick={handleResetPassword}>
            Update
          </Button>

        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export default Login;