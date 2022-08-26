import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { activate } from "../actions/auth";

const Activate = () => {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const token = new URLSearchParams(search).get('token');
    const [successful, setSuccessful] = useState(false);

    if (successful) {
      return <Redirect to="/login" />;
    }

    const activateUser = (e) => {
        dispatch(activate(token))
        .then(() => {
            setSuccessful(true);
          })
          .catch(() => {
            setSuccessful(false);
          });
    };
    return (
        <div>{activateUser()}</div>);
};
export default Activate;