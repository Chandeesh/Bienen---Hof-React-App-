import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { getPeopleData, postPeopleData, deletePeopleData } from "../../actions/peopleData";
import { useLocation } from "react-router-dom";
import { TrashFill, InfoCircle } from "react-bootstrap-icons";

const BeuerTeilungen = () => {
    // const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const search = useLocation().search;
    const peopleId = new URLSearchParams(search).get('id');
    const beurteilungen = ["Volkstärke", "Raumreserve", "Weiselrichtigkeit", "Sanftmut", "Schwarmstimmung", "Futterversorgung", "Gesundheit", "VarroaBeurteilung"];
    const infoIconTooltip = ["gute Volkstärke", "genügend Raumreserve",
        "königin gesehen",
        "Sanftmtig",
        "niedrige Schwarmstimmung",
        "genügend Futterversorgung",
        "Gesund",
        "Kein relevanter Varroabefall"];
    const [showEditBeurteilungen, setShowEditBeurteilungen] = useState(false);
    const [peopleData, setPeopleData] = useState({});
    var beurteilungenTemp = {};
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDeleteOff = () => setShowDelete(false);
    const [deleteBeuerTeilungenId, setDeleteBeuerId] = useState("");
    const [selectedButton, setSelectedButton] = useState({});
    var temp = {};

    const handleEditeBeurteilungenOn = () => {
        setShowEditBeurteilungen(true);
    }

    const handleEditeBeurteilungenOff = () => {
        setShowEditBeurteilungen(false);
        beurteilungenTemp = [];
        setSelectedButton([]);
    }

    const getPeopleDatas = () => {
        dispatch(getPeopleData(peopleId))
            .then((response) => {
                setPeopleData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        // Update the document title using the browser API
        getPeopleDatas();
    }, []);

    const handleAddBeuerteilungen = (element, color, index) => {
        temp[element] = color;
        Object.assign(beurteilungenTemp, temp);
        const clone = {...beurteilungenTemp};
        setSelectedButton(ele => ({
            ...ele,
            ...clone
        }));
    }

    const handleAddBeuerteilungenSave = () => {
        console.log(selectedButton);
        dispatch(postPeopleData(peopleId, selectedButton))
            .then(() => {
                getPeopleDatas();
                setShowEditBeurteilungen(false);
                setSelectedButton({});
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const handleTrashClick = (id) => {
        setShowDelete(true);
        setDeleteBeuerId(id);
    }

    const handleDeleteBeuer = () => {
        dispatch(deletePeopleData(deleteBeuerTeilungenId))
            .then(() => {
                getPeopleDatas();
                setShowDelete(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div class="container" style={{ paddingTop: "20px" }}>
            <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>
                {
                    peopleData[0] ? <div class="table-responsive-sm">
                        <table class="table" style={{ borderColor: 'white' }}>
                            <thead class="thead-dark">
                                <td>
                                    <tr>
                                        <th>Activity</th>
                                    </tr>
                                </td>
                                {peopleData.map((element, index) =>
                                    <td style={{ paddingLeft: '15px' }}>
                                        <tr>
                                            <th>{peopleData[index].date.replaceAll('-', '.').substr(5, 5)}</th>
                                        </tr>
                                    </td>
                                )}
                            </thead>
                            <tbody>
                                <td>
                                    {beurteilungen.map((element, index) => (

                                        <tr style={{ height: '34px', verticalAlign: 'middle' }} key={index}>
                                            <a><InfoCircle data-toggle='tooltip' data-placement='left'
                                                style={{ cursor: 'pointer', color: 'blue' }} title={'Grün = ' + infoIconTooltip[index]} >
                                            </InfoCircle></a>
                                            {"          " + element}
                                        </tr>
                                    ))}
                                </td>
                                {
                                    peopleData.map((element, index) => (
                                        <td style={{ paddingLeft: '15px' }}>
                                            {beurteilungen.map((ele, inde) => (

                                                <tr key={inde} style={{ height: '34px', verticalAlign: 'middle' }}>
                                                    <button type="button" class="btn btn-circle" style={{ backgroundColor: peopleData[index].values[ele], borderColor: 'white' }}></button>
                                                </tr>
                                            ))}
                                            <TrashFill size={30} style={{ cursor: 'pointer' }} onClick={() => handleTrashClick(element._id)}>
                                            </TrashFill>
                                        </td>

                                    ))
                                }
                            </tbody>
                        </table>
                        <Button variant="warning" onClick={() => handleEditeBeurteilungenOn()}>Add Data</Button>{'   '}

                    </div> : <>
                        <div class="table-responsive-sm">
                            <table class="table table-borderless">
                                <tbody>
                                    <td>
                                        {beurteilungen.map((element, index) => (

                                            <tr style={{ height: '34px', verticalAlign: 'middle' }} key={index}>
                                                <a><InfoCircle data-toggle='tooltip' data-placement='left'
                                                    style={{ cursor: 'pointer', color: 'blue' }} title={'Grün = ' + infoIconTooltip[index]} >
                                                </InfoCircle></a>
                                                {"          " + element}
                                            </tr>
                                        ))}
                                    </td>
                                </tbody>
                            </table>
                            <Button variant="warning" onClick={() => handleEditeBeurteilungenOn()}>Add Data</Button>{'   '}
                        </div>
                    </>
                }
            </div>
            <Modal show={showEditBeurteilungen} onHide={handleEditeBeurteilungenOff}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Edit Activity</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="d-flex justify-content-center" style={{ paddingTop: "20px" }}>

                        <div class="table-responsive-sm">
                            <table class="table" style={{ borderColor: 'white' }}>


                                <tbody>
                                    <td>
                                        {beurteilungen.map((element, index) => (
                                            <tr key={index} style={{ height: '45px', verticalAlign: 'middle' }}>
                                                {element}</tr>
                                        ))}
                                    </td>
                                    <td style={{ paddingLeft: '10px' }}>
                                        {beurteilungen.map((element, index) => (
                                            <tr key={index} style={{ height: '45px', verticalAlign: 'middle' }}>
                                                <div>
                                                    <Dropdown>
                                                        <Dropdown.Toggle class="btn btn-circle dropdown-toggle" type="button" id="dropdownMenuButton" style={{backgroundColor: selectedButton[element]}}>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'green', index)} class="btn btn-circle" style={{ backgroundColor: 'green', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'yellow', index)} class="btn btn-circle" style={{ backgroundColor: 'yellow', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'red', index)} class="btn btn-circle" style={{ backgroundColor: 'red', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'lightgreen', index)} class="btn btn-circle" style={{ backgroundColor: 'lightgreen', borderColor: 'white' }}></button>
                                                                <button type="button" onClick={() => handleAddBeuerteilungen(element, 'lightgrey', index)} class="btn btn-circle" style={{ backgroundColor: 'lightgrey', borderColor: 'white' }}></button>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown></div></tr>
                                        ))}
                                    </td>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleEditeBeurteilungenOff}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleAddBeuerteilungenSave}>
                        Save
                    </Button>
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
                    <Button variant="warning" onClick={handleDeleteBeuer}>
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
};
export default BeuerTeilungen;