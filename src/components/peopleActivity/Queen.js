import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { getQueenData, createQueenData, updateQueenData, deleteQueenData } from "../../actions/queen";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { PersonPlus } from 'react-bootstrap-icons';

const Queen = () => {
    // const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const search = useLocation().search;
    const peopleId = new URLSearchParams(search).get('id');
    const [queenData, setQueenData] = useState({});
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
    const [designation, setDesignationData] = useState("");
    const [year, setYearData] = useState("");
    const [marked, setMarkedData] = useState(false);
    const [origin, setOriginData] = useState("");
    const [matingType, setMatingType] = useState("");
    const Herkunft = [
        { label: "Umgeweiselt im Volk", value: "Umgeweiselt im Volk" },
        { label: "Zuchstoff aus Volk", value: "Zuchstoff aus Volk" },
        { label: "Eigene Königin aus aktivem Volk", value: "Eigene Königin aus aktivem Volk" },
        { label: "Eigene Königin aus aufgelöstem Volk", value: "Eigene Königin aus aufgelöstem Volk" },
        { label: "Fremde Königin", value: "Fremde Königin" }
    ];
    const Art = [
        { label: "Standbegattung", value: "Standbegattung" },
        { label: "Belegstelle", value: "Belegstelle" },
        { label: "Besamung", value: "Besamung" }
    ];
    const handleClose = () => { setShow(false); handleIsUpdateOff() }

    const handleUpdate = (id) => {
        setShow(true);
        handleIsUpdateOn();
        setId(id);
    }

    const onChangeDesignation = (e) => {
        setDesignationData(e.target.value);
    }

    const onChangeYear = (e) => {
        setYearData(e.target.value);
    }

    const onChangeMarked = () => {
        setMarkedData(!marked);
    }

    const onChangeOrigin = (e) => {
        setOriginData(e.value);
    }

    const onChangeMatingType = (e) => {
        setMatingType(e.label);
    }

    const onChangeText = (e) => {
        setTextData(e.target.value);
    }

    const getQueenDatas = () => {
        dispatch(getQueenData(peopleId))
            .then((response) => {
                setQueenData(response);
                if (response != null) {
                    setSuccessful(true);
                }
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const createQueenDatas = (e) => {
        e.preventDefault();
        dispatch(createQueenData(peopleId, designation, year, marked, origin, matingType))
            .then(() => {
                getQueenDatas();
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const updateData = (e) => {
        e.preventDefault();
        dispatch(updateQueenData(id, peopleId, designation, year, marked, origin, matingType))
            .then(() => {
                getQueenDatas();
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteData = (e) => {
        e.preventDefault();
        dispatch(deleteQueenData(id))
            .then(() => {
                getQueenDatas();
                handleShowDeleteOff();
                setSuccessful(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // Update the document title using the browser API
        getQueenDatas();
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
                        {successful ? <div class="col-md-4">
                            <div class="card customCard w-100 hover-shadow">
                                <div class="card-block">
                                    <h4 class="card-title">{queenData.designation}</h4>
                                    <p></p>
                                    <p></p>
                                    <p class="card-text p-y-1">{queenData.year}</p>
                                    <a href="#" onClick={() => handleUpdate(queenData._id)} class="card-link">Edit</a>
                                    <a href="#" class="card-link" onClick={() => handleDelete(queenData._id)}>Delete</a>
                                </div>
                            </div>
                        </div> : <>
                            <div class="col-md-4" onClick={() => setShow(true)}>
                            <a href="#">
                                <div class="card">
                                    <div class="card-block" style={{textAlign:'center'}}>
                                        <PersonPlus size={70}/>
                                    </div>
                                </div>
                                </a>
                            </div></>
                        }

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
                            <Form.Label>Designation</Form.Label>
                            <Form.Control value={designation}
                                onChange={onChangeDesignation}
                                placeholder="designation"
                                autoFocus
                            />
                            <Form.Label>Year</Form.Label>
                            <Form.Control value={year}
                                onChange={onChangeYear}
                                placeholder="year"
                                autoFocus
                            />
                            <div class="form-check" style={{ paddingLeft: '25px' }}>
                                <input class="form-check-input" type="checkbox" onChange={onChangeMarked} value="" id="flexCheckDefault" />
                                <label class="form-check-label" for="flexCheckDefault">
                                    Marked
                                </label>
                            </div>
                            <Form.Label>Herkunft</Form.Label>
                            <Select onChange={onChangeOrigin} options={Herkunft} />
                            <Form.Label>Art der Begattung</Form.Label>
                            <Select onChange={onChangeMatingType} options={Art} />
                            <Form.Label>Notizen hinzufügen</Form.Label>
                            <Form.Control value={text}
                                onChange={onChangeText}
                                placeholder="notizen"
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
                        <Button variant="warning" onClick={createQueenDatas}>
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
export default Queen;