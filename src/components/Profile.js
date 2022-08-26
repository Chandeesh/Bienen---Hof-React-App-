import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  Modal, Button
} from "react-bootstrap";
import { deleteUser,logout } from "../actions/auth";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showDelete, setShowDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleShowDeleteOn = () => {
    setShowDelete(true);
  }

  const handleShowDeleteOff = () => {
    setShowDelete(false);
  }

  const logOut = () => {
    dispatch(logout());
  };

  const deleteAccount = (e) => {
    setLoading(true);
    dispatch(deleteUser(currentUser.details.email))
      .then(() => {
        handleShowDeleteOff();
        logOut();
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });

  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }


  return (
    <div class="container mt-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-7">
          <div class="card p-3 py-4">
            <div class="text-center">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
            </div>
            <div class="text-center mt-3">
              <span class="bg-secondary p-1 px-4 rounded text-white">User</span>
              <div class="px-4 mt-1">
                <p class="fonts"></p>
              </div>
              <h5 class="mt-2 mb-0">{currentUser.details.email}</h5>
              <div class="px-4 mt-1">
                <p class="fonts"></p>
              </div>
              <div class="buttons">
                <button className="btn btn-outline-primary px-4" disabled={loading} onClick={handleShowDeleteOn}>
                  {loading && (
                    <span className="spinner-border spinner-grow-sm"></span>
                  )}{'     '}
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={handleShowDeleteOff}>
        <Modal.Header closeButton>
          <Modal.Title> Do you want to delete your account?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All the data will associated with this account will be lost and this action cannot be undone
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleShowDeleteOff}>
            Close
          </Button>
          <Button variant="warning" onClick={deleteAccount}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Profile;