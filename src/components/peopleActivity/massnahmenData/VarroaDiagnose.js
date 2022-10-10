import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";
import Select from "react-select";
import { createMassNahmenData, updateMassNahmenData, deleteMassNahmenData } from "../../../actions/massnahmen";
const VarroaDiagnose = (props) => {

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
    const [diagnoseart, setDiagnoseArt] = useState("");
    const [anzahlMilben, setAnzahlMilben] = useState("");
    const [anzahlTage, setAnzahlTage] = useState("");
    const diagnoseArt = [
        { label: "Gemülldiagnose", value: "Gemülldiagnose" },
        { label: "Auswachung/Puderzucker-Methode", value: "Auswachung/Puderzucker-Methode" }
    ];
    const [validateMsg, setValidateMsg] = useState("");
    const [message, setMessage] = useState("");
    var temp = {
        varroaDiagnose:
            [{
                date: date,
                typ: "Varroa-Diagnose",
                diagnoseart: diagnoseart,
                anzahlMilben: anzahlMilben,
                anzahlTage: anzahlTage
            }]
    }
    const [dataForUpdate, setDataForUpdate] = useState({})
    const handleDate = (e) => {
        setDate(e.target.value);
        temp.varroaDiagnose[0].date = date;
    }

    const handleDiagnoseArt = (e) => {
        setDiagnoseArt(e.value);
        temp.varroaDiagnose[0].diagnoseart = diagnoseart;
    }

    const handleAnzahlMilben = (e) => {
        setAnzahlMilben(e.target.value);
        temp.varroaDiagnose[0].anzahlMilben = anzahlMilben;
    }

    const handleAnzahlTage = (e) => {
        temp.varroaDiagnose[0].anzahlTage = e.target.value;
        console.log(temp);
        setAnzahlTage(e.target.value);
        setMessage(anzahlMilben / e.target.value);
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
        dispatch(updateMassNahmenData(props.peopleId, id,dataForUpdate))
            .then(() => {
                setShow(false);
                handleIsUpdateOff();
                {props.onChangeMainData()};
            })
            .catch((err) => {
                console.log(err);
            });
            
    }   

    const saveData = (e) => {
        e.preventDefault();
        if(date=="" || diagnoseart=="" || anzahlMilben=="" || anzahlTage=="") {
            setValidateMsg("Please fill all fields!!");
        } else {
            setValidateMsg("");
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
        dispatch(deleteMassNahmenData(props.data._id,id, "varroaDiagnose"))
            .then(() => {
                handleShowDeleteOff();
                window.location.reload(false);
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
                                {props.data.data["varroaDiagnose"].map(function (data, index) {
                                    return <div class="col-md-4">
                                        <div class="card customCard w-100 hover-shadow">
                                            <div class="card-block">
                                                <h4 class="card-title">{data.date.substr(0, 10)}</h4>
                                                <p></p>
                                                <label>{data.diagnoseart}</label>
                                                <label >Anzahl Milben: {data.anzahlMilben}</label>
                                                <p>Anzahl Tage: {data.anzahlTage}</p>
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
                                    <div class="card customCard w-100 hover-shadow" style={{ height: '220.15px' }} onClick={() => setShow(true)}>
                                        <a href="#">
                                            <div class="card-block" style={{ textAlign: 'center', paddingTop: '50px' }}>
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
                    <Modal.Title>Enter diagnosis details</Modal.Title>
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
                            <Form.Label>Diagnoseart</Form.Label>
                            <Select onChange={handleDiagnoseArt} options={diagnoseArt} />
                            <Form.Label>Anzahl Milben</Form.Label>
                            <Form.Control value={anzahlMilben}
                                onChange={handleAnzahlMilben}
                                placeholder="anzahl milben"
                                autoFocus
                            />
                            <Form.Label>Anzahl Tage</Form.Label>
                            <Form.Control value={anzahlTage}
                                onChange={handleAnzahlTage}
                                placeholder="anzahl milben"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                    {message && (
                        <div className="form-group" style={{ paddingTop: '15px' }}>
                            <div className="alert alert-success" role="alert">
                                Durchschnittlicher Milbenbefall: {message} Milben/Tag
                            </div>
                        </div>
                    )}
                    {validateMsg ?<> <div className="form-group" style={{ paddingTop: '15px' }}>
                            <div className="alert alert-danger" role="alert">
                                {validateMsg}
                            </div>
                        </div></> :<></>   
                    }
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

export default VarroaDiagnose;