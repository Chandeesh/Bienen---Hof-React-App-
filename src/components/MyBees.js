import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBeehive, getBeehives, saveBeehive, updateBeehive } from "../actions/beehives";
import { TOAST_PROPERTIES } from './toastProperties';
import { Redirect } from 'react-router-dom';
import {
    Button, Modal, Form
} from "react-bootstrap";
import Toast from "./Toast";
import { PersonPlus } from "react-bootstrap-icons";
import EventBus from "../common/EventBus";

const MyBees = () => {
    // const { message } = useSelector(state => state.message);
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleClose = () => { setShow(false); handleIsUpdateOff() }
    const handleShow = () => setShow(true);
    const handleShowDeleteOn = () => { setShowDelete(true); }
    const handleShowDeleteOff = () => setShowDelete(false);
    const [beehives, setBeehives] = useState({});
    const [location, setLocation] = useState("");
    const [postCode, setPostcode] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [list, setList] = useState([]);
    const [autoDeleteTime, setAutoDeleteTime] = useState(0);
    const handleIsUpdateOn = () => setIsUpdate(true);
    const handleIsUpdateOff = () => setIsUpdate(false);
    const [redirect, setRedirect] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    const showToast = type => {
        setAutoDeleteTime(3000);
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title === type);
        setList([...list, toastProperties]);
    }

    const onChangeLocation = (e) => {
        setLocation(e.target.value);
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangePostCode = (e) => {
        setPostcode(e.target.value);
    }

    const handleUpdate = (id) => {
        handleShow();
        handleIsUpdateOn();
        setId(id);
    }

    const handleDelete = (id) => {
        handleShowDeleteOn();
        setId(id);
    }

    const getBeehivesData = () => {
        dispatch(getBeehives(user.details.email))
            .then((response) => {
                setBeehives(response);
                setSuccessful(true);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    EventBus.dispatch("logOut");
                  }
                setSuccessful(false);
            });
    }

    const saveData = (e) => {
        console.log("Inside Save Data");
        e.preventDefault();
        dispatch(saveBeehive(name, user.details.email, location, postCode))
            .then(() => {
                getBeehivesData();
                setShow(false);
                handleIsUpdateOff();
                showToast("Success");
            })
            .catch(() => {
                showToast("Danger");
            });
    }

    const updateData = (e) => {
        e.preventDefault();
        dispatch(updateBeehive(id, name, location, postCode))
            .then(() => {
                getBeehivesData();
                setShow(false);
                handleIsUpdateOff();
                showToast("Success");
            })
            .catch(() => {
                showToast("Danger");
            });
    }

    const deleteData = (e) => {
        e.preventDefault();
        dispatch(deleteBeehive(id))
            .then(() => {
                getBeehivesData();
                handleShowDeleteOff();
                showToast("Success");
            })
            .catch(() => {
                showToast("Danger");
            });
    }


    if (!currentUser) {
        return <Redirect to="/login" />;
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            // Update the document title using the browser API
            getBeehivesData();
        }, []);
    }

    return (
        <>
            <div>
                <div class="py-5">

                    <div class="container">
                        <div class="row hidden-md-up justify-content-center">
                            {
                                successful ? <>
                                    {beehives.map(function (beehive, index) {
                                        return <div class="col-md-4">
                                            <div class="card customCard w-100 hover-shadow">
                                                <div class="card-block">
                                                    <h4 class="card-title">{beehive.name}</h4>
                                                    <p></p>
                                                    <h6 class="card-subtitle text-muted">{beehive.postcode}</h6>
                                                    <p></p>
                                                    <p class="card-text p-y-1">Click below to add data for this beehive</p>
                                                    <a href="#" class="card-link" onClick={() => handleUpdate(beehive._id)}>Edit</a>
                                                    <a href={"/people?name=" + beehive.location + "&beehiveId=" + beehive._id} class="card-link">Details</a>
                                                    <a href="#" class="card-link" onClick={() => handleDelete(beehive._id)}>Delete</a>
                                                </div>
                                            </div>
                                        </div>
                                    })}


                                </> : <></>
                            }
                            <div class="col-md-4" >
                                <div class="card customCard w-100 hover-shadow" style={{ height: '190.75px' }} onClick={() => handleShow()}>
                                    <a href="#">
                                        <div class="card-block" style={{ textAlign: 'center', paddingTop: '28px' }}>
                                            <PersonPlus size={70} />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter your beehive details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name of the Beehive</Form.Label>
                                <Form.Control value={name}
                                    onChange={onChangeName}
                                    placeholder="name"
                                    autoFocus
                                />
                                <Form.Label>Name of the location</Form.Label>
                                <Form.Control value={location}
                                    onChange={onChangeLocation}
                                    placeholder="location"
                                    autoFocus
                                />
                            </Form.Group>
                            <Form.Group
                                value={postCode}
                                onChange={onChangePostCode}
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                            >
                                <Form.Label>Post Code</Form.Label>
                                <Form.Control
                                    placeholder="postcode"
                                    autoFocus
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleClose}>
                            Close
                        </Button>
                        {isUpdate ? <>
                            <Button variant="warning" onClick={updateData}>
                                Update Changes
                            </Button>
                        </> : <>
                            <Button variant="warning" onClick={saveData}>
                                Save Changes
                            </Button>
                        </>
                        }

                    </Modal.Footer>
                </Modal>

                <Modal show={showDelete} onHide={handleShowDeleteOff}>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you want to delete this item?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleShowDeleteOff}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={deleteData}>
                            Delete
                        </Button>

                    </Modal.Footer>
                </Modal>
            </div>
            <Toast
                toastList={list}
                position={'top-right'}
                autoDeleteTime={autoDeleteTime}
            />
        </>
    )
};
export default MyBees;