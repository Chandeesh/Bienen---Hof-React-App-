import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";
import Select from "react-select";
import { createMassNahmenData, updateMassNahmenData, deleteMassNahmenData } from "../../../actions/massnahmen";
const Futtergabe = (props) => {

    const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDeleteOn = () => { setShowDelete(true); }
    const handleShowDeleteOff = () => setShowDelete(false);
    const [show, setShow] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [id, setId] = useState("");
    const handleIsUpdateOn = () => setIsUpdate(true);
    const handleIsUpdateOff = () => setIsUpdate(false);
    const handleClose = () => { setShow(false); handleIsUpdateOff() }
    const [date, setDate] = useState("");
    const [art, setArt] = useState("");
    const [menge, setMenge] = useState("");
    const [isAndere, setIsAndere] = useState(false);

    const [andere, setAndere] = useState("");
    const futterArt = [
        { label: "Futterwaben", value: "Futterwaben" },
        { label: "Honig", value: "Honig" },
        { label: "Zuckerlösung 1:1", value: "Zuckerlösung 1:1" },
        { label: "Zuckerlösung 3:2", value: "Zuckerlösung 3:2" },
        { label: "Futterteig", value: "Futterteig" },
        { label: "Futtersirup", value: "Futtersirup" },
        { label: "Andere", value: "Andere" }
    ];
    const [message, setMessage] = useState("");

    var temp = {
        futtergabe:
            [{
                date: date,
                typ: "Futtergabe",
                futterart: art,
                futterMenge: menge
            }]
    }
    const [dataForUpdate, setDataForUpdate] = useState({})
    const handleDate = (e) => {
        setDate(e.target.value);
        temp.futtergabe[0].date = date;
    }

    const handleArt = (e) => {
        setArt(e.value);
        if (e.value === "Andere") {
            setIsAndere(true);
            setArt(e.value);
        } else {
            setIsAndere(false);
            setArt(e.value);
        }
        temp.futtergabe[0].futterart = e.value;
    }

    const handleAndere = (e) => {
        setAndere(e.target.value);
        temp.futtergabe[0].andere = andere;
    }

    const handleMenge = (e) => {
        setMenge(e.target.value);
        temp.futtergabe[0].futterMenge = e.target.value;
        setDataForUpdate(temp);
    }

    const handleUpdate = (id) => {
        setShow(true);
        handleIsUpdateOn();
        setId(id);
    }

    const handleDelete = (id) => {
        handleShowDeleteOn();
        setId(id);
    }

    const updateData = (e) => {
        e.preventDefault();
        setDataForUpdate(temp);
        dispatch(updateMassNahmenData(props.peopleId, id, dataForUpdate))
            .then(() => {
                setShow(false);
                handleIsUpdateOff();
                { props.onChangeMainData() };
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const saveData = (e) => {
        e.preventDefault();
        if(date=="" || art=="") {
            setMessage("Please fill all fields!!");
        } else {
            dispatch(createMassNahmenData(props.peopleId, dataForUpdate))
            .then(() => {
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    const deleteData = (e) => {
        e.preventDefault();
        console.log(id);
        dispatch(deleteMassNahmenData(props.data._id,id, "futtergabe"))
            .then(() => {
                handleShowDeleteOff();
            })
            .catch((err) => {
                console.log(err);
                handleShowDeleteOff();
            });
    }

    return (
        <div class="container" style={{ paddingTop: "20px" }}>
            <div class="py-5">
                <div class="container">
                    <div class="row hidden-md-up justify-content-center">
                        {
                            props.data ? <>
                                {props.data.data["futtergabe"].map(function (data, index) {
                                    return <div class="col-md-4">
                                        <div class="card customCard w-100 hover-shadow">
                                            <div class="card-block">
                                                <h4 class="card-title">{data.date.substr(0, 10)}</h4>
                                                <p></p>
                                                <p></p>
                                                <label>Futterart: {data.futterart}</label>
                                                {
                                                    data.andere ? <>
                                                        <label>{data.andere}</label>
                                                    </> : <></>
                                                }
                                                 <p></p>
                                                <label>{'Futter Menge (L):'} {data.futterMenge}</label>
                                                <p></p>
                                                <a href="#" onClick={() => handleUpdate(data._id)} class="card-link">Edit</a>
                                                <a href="#" onClick={() => handleDelete(data._id)} class="card-link">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </> : <>
                            </>
                        }
                        <div class="col-md-4" >
                            <div class="card customCard w-100 hover-shadow" style={{ height: '200.15px' }} onClick={() => setShow(true)}>
                                <a href="#">
                                    <div class="card-block" style={{ textAlign: 'center', paddingTop: '35px' }}>
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
                    <Modal.Title>Enter futtergabe details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control value={date}
                                type="date"
                                onChange={handleDate}
                                placeholder="date"
                                autoFocus
                            />
                            <Form.Label>Methode</Form.Label>
                            <Select onChange={handleArt} options={futterArt} />
                            {
                                isAndere ? <>
                                    <Form.Label>Andere</Form.Label>
                                    <Form.Control value={andere}
                                        onChange={handleAndere}
                                        placeholder="Andere"
                                        autoFocus
                                    />
                                </> : <></>
                            }
                            <Form.Label>{'Futtermenge (L)'}</Form.Label>
                            <Form.Control value={menge}
                                onChange={handleMenge}
                                placeholder="Futtermenge (L)"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                    {message && (
                        <div className="form-group" style={{ paddingTop: '15px' }}>
                            <div className="alert alert-danger" role="alert">
                               {message}
                            </div>
                        </div>
                    )}
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

export default Futtergabe;