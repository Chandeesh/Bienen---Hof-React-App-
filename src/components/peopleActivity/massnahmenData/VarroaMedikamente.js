import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { PersonPlus } from "react-bootstrap-icons";
import Select from "react-select";
import { createMassNahmenData, updateMassNahmenData, deleteMassNahmenData } from "../../../actions/massnahmen";

const VarroaMedikamente = (props) => {

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
    const [medikamente, setMedikamente] = useState("");
    const [menge, setMenge] = useState("");
    const [isAndere, setIsAndere] = useState(false);
    const [andere, setAndere] = useState("");
    const mediTyp = [
        { label: "Ameisensäure", value: "Ameisensäure" },
        { label: "Milchsäure", value: "Milchsäure" },
        { label: "Oxalsäure", value: "Oxalsäure" },
        { label: "Andere", value: "Andere" },
    ];
    var temp = {
        varroaMedikamente:
            [{
                date: date,
                typ: "Varroa-Medikamente",
                medikamente: medikamente,
                menge: menge
            }]
    }
    const [dataForUpdate, setDataForUpdate] = useState({})
    const handleDate = (e) => {
        setDate(e.target.value);
        temp.varroaMedikamente[0].date = date;
    }

    const handleMedikamente = (e) => {
        setMedikamente(e.value);
        if (e.value === "Andere") {
            setIsAndere(true);
        } else {
            setIsAndere(false);
        }
        temp.varroaMedikamente[0].medikamente = medikamente;
    }

    const handleAndere = (e) => {
        setAndere(e.target.value);
        temp.varroaMedikamente[0].andere = andere;
    }

    const handleMenge = (e) => {
        temp.varroaMedikamente[0].menge = e.target.value;
        setMenge(e.target.value);
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
        dispatch(createMassNahmenData(props.peopleId, dataForUpdate))
            .then(() => {
                setShow(false);
                handleIsUpdateOff();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteData = (e) => {
        e.preventDefault();
        console.log(id);
        dispatch(deleteMassNahmenData(props.data._id,id, "varroaMedikamente"))
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
                                {props.data.data["varroaMedikamente"].map(function (data, index) {
                                    return <div class="col-md-4">
                                        <div class="card customCard w-100 hover-shadow">
                                            <div class="card-block">
                                                <h4 class="card-title">{data.date.substr(0, 10)}</h4>
                                                <p></p>
                                                <label>{data.medikamente}</label>
                                                {
                                                    data.andere ? <>
                                                        <label>{data.andere}</label>
                                                    </> : <></>
                                                }
                                                <label >Menge (ml): {data.menge}</label>
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
                            <div class="card customCard w-100 hover-shadow" style={{ height: '180.15px' }} onClick={() => setShow(true)}>
                                <a href="#">
                                    <div class="card-block" style={{ textAlign: 'center', paddingTop: '30px' }}>
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
                    <Modal.Title>Enter medicine details</Modal.Title>
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
                            <Form.Label>Medikamente</Form.Label>
                            <Select onChange={handleMedikamente} options={mediTyp} />
                            {
                                isAndere ? <>
                                    <Form.Label>Andere Medikamente</Form.Label>
                                    <Form.Control value={andere}
                                        onChange={handleAndere}
                                        placeholder="Andere Medikamente"
                                        autoFocus
                                    />
                                </> : <></>
                            }
                            <Form.Label>Menge</Form.Label>
                            <Form.Control value={menge}
                                onChange={handleMenge}
                                placeholder="Menge"
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

export default VarroaMedikamente;