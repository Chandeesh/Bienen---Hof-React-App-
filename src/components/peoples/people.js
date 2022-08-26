import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { deletePeople, getPeople, savePeople, updatePeople } from "../../actions/people";
import { TOAST_PROPERTIES } from '../toastProperties';
import {
     Button, Modal, Form
} from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import { PersonPlus } from "react-bootstrap-icons";

const People = (props) => {
    // const { message } = useSelector(state => state.message);
    const search = useLocation().search;
    const nameParam = new URLSearchParams(search).get('name');
    const beehiveId = new URLSearchParams(search).get('beehiveId');
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleClose = () => { setShow(false); handleIsUpdateOff() }
    const handleShow = () => setShow(true);
    const handleShowDeleteOn = () => { setShowDelete(true); }
    const handleShowDeleteOff = () => setShowDelete(false);
    const [peoples, setPeople] = useState({});
    const [designation, setDesignation] = useState("");
    const [id, setId] = useState("");
    const [location, setLocation] = useState("");
    const [list, setList] = useState([]);
    const [autoDeleteTime, setAutoDeleteTime] = useState(0);
    const handleIsUpdateOn = () => setIsUpdate(true);
    const handleIsUpdateOff = () => setIsUpdate(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    const showToast = type => {
        setAutoDeleteTime(3000);
        const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title === type);
        setList([...list, toastProperties]);
    }

    const onChangeDesignation = (e) => {
        setDesignation(e.target.value);
    }

    const onChangeLocation = (e) => {
        setLocation(e.target.value);
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

    const getPeoplesData = () => {
        dispatch(getPeople(beehiveId))
            .then((response) => {
                setPeople(response);
                console.log(peoples);
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const saveData = (e) => {
        console.log("Inside Save Data");
        e.preventDefault();
        dispatch(savePeople(beehiveId, designation, location))
            .then(() => {
                getPeoplesData();
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
        dispatch(updatePeople(id, designation, location))
            .then(() => {
                getPeoplesData();
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
        dispatch(deletePeople(id))
            .then(() => {
                getPeoplesData();
                handleShowDeleteOff();
                showToast("Success");
            })
            .catch(() => {
                showToast("Danger");
            });
    }


    useEffect(() => {
        // Update the document title using the browser API
        getPeoplesData();
    }, []);

    if (!currentUser) {
        return <Redirect to="/login" />;
    }
    return (
        <div className="container" style={{ paddingTop: "20px" }}>
            <div><a href='/mybees'>Back</a></div>

            <div class="d-flex justify-content-center">
                <ListGroup horizontal style={{ width: '10rem', height: '5rem', backgroundColor: '#3DB9F9' }}>
                    <ListGroup.Item action style={{ paddingLeft: '3rem' }}>{nameParam}</ListGroup.Item>
                </ListGroup>
            </div>
            <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>
            </div>


            <div class="py-5">

                <div class="container">
                    <div class="row hidden-md-up justify-content-center">
                        {
                            successful ? <>
                                {peoples.map(function (people, index) {
                                    return <div class="col-md-4">
                                        <div class="card customCard w-100 hover-shadow">
                                            <div class="card-block">
                                                <h4 class="card-title">{people.location}</h4>
                                                <p></p>
                                                <p></p>
                                                <p class="card-text p-y-1">Click below to add data for this beehive</p>
                                                <a href="#" onClick={() => handleUpdate(people._id)} class="card-link">Edit</a>
                                                <a href={"/peopledata?id=" + people._id} class="card-link">Details</a>
                                                <a href="#" class="card-link" onClick={() => handleDelete(people._id)}>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </> : <></>
                        }
                        <div class="col-md-4" >
                            <div class="card customCard w-100 hover-shadow" style={{ height: '159.75px' }} onClick={() => handleShow()}>
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
                    <Modal.Title>Enter people details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={location}
                                onChange={onChangeLocation}
                                placeholder="location"
                                autoFocus
                            />
                            <Form.Label>designation</Form.Label>
                            <Form.Control value={designation}
                                onChange={onChangeDesignation}
                                placeholder="designation"
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
    )
};
export default People;