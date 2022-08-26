import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {  Button, Modal, Form } from "react-bootstrap";
import { getNotizenData, createNotizenData, updateNotizenData, deleteNotizenData } from "../../actions/notizenData";
import { useLocation } from "react-router-dom";
import { PersonPlus } from "react-bootstrap-icons";

const Notizen = () => {
    // const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const search = useLocation().search;
    const peopleId = new URLSearchParams(search).get('id');
    const [notizenData, setNotizenData] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDeleteOn = () => { setShowDelete(true); }
    const handleShowDeleteOff = () => setShowDelete(false);
    const [show, setShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [id, setId] = useState("");
    const [successful, setSuccessful] = useState(false);
    const handleIsUpdateOn = () => setIsUpdate(true);
    const handleIsUpdateOff = () => setIsUpdate(false);
    const [text, setTextData] = useState("");
    const handleClose = () => { setShow(false); handleIsUpdateOff() }

    const handleUpdate = (id) => {
        setShow(true);
        handleIsUpdateOn();
        setId(id);
    }

    const onChangeText = (e) => {
        setTextData(e.target.value);
    }

    const getNotizenDatas = () => {
        dispatch(getNotizenData(peopleId))
            .then((response) => {
                setNotizenData(response);
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const saveNotizenData = (e) => {
        e.preventDefault();
        dispatch(createNotizenData(peopleId, text))
            .then(() => {
                getNotizenDatas();
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateData = (e) => {
        e.preventDefault();
        dispatch(updateNotizenData(id, text))
            .then(() => {
                getNotizenDatas();
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteData = (e) => {
        e.preventDefault();
        dispatch(deleteNotizenData(id))
            .then(() => {
                getNotizenDatas();
                handleShowDeleteOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // Update the document title using the browser API
        getNotizenDatas();
    }, []);



    const handleDelete = (id) => {
        handleShowDeleteOn();
        setId(id);
    }


    return (
        <div class="container" style={{ paddingTop: "20px" }}>
            <div class="py-5">

                <div class="container">
                    <div class="row hidden-md-up justify-content-center">
                        {
                            successful ? <>
                                {notizenData.map(function (notizen, index) {
                                    return <div class="col-md-4">
                                        <div class="card customCard w-100 hover-shadow">
                                            <div class="card-block">
                                                <h4 class="card-title">{notizen.date.substr(0, 10)}</h4>
                                                <p></p>
                                                <p></p>
                                                <p class="card-text p-y-1">{notizen.text}</p>
                                                <a href="#" onClick={() => handleUpdate(notizen._id)} class="card-link">Edit</a>
                                                <a href="#" class="card-link" onClick={() => handleDelete(notizen._id)}>Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </> : <></>
                        }
                        <div class="col-md-4" >
                            <div class="card customCard w-100 hover-shadow" style={{ height: '158.15px' }} onClick={() => setShow(true)}>
                                <a href="#">
                                    <div class="card-block" style={{ textAlign: 'center', paddingTop: '15px' }}>
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
                            <Form.Label>Text</Form.Label>
                            <Form.Control value={text}
                                onChange={onChangeText}
                                placeholder="text"
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
                        <Button variant="warning" onClick={saveNotizenData}>
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
export default Notizen;