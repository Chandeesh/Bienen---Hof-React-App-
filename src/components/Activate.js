import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { activate } from "../actions/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Activate = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const [successful, setSuccessful] = useState(false);

  const activateUser = (e) => {
    dispatch(activate(token))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  }

  useEffect(() => {
    activateUser();
  }, []);

  if (successful) {
    toast("Your account has been activated. Please login to continue", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      });
    return <Redirect to="/login" />;
  }

  return (
    <div></div>);
};
export default Activate;