import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import BeuerTeilungen from "./BeuerTeilungen";
import Notizen from "./Notizen";
import Queen from "./Queen";
import Massnahmen from "./Massnahmen";
import Select from "react-select";

const PeopleActivityData = () => {
    // const { message } = useSelector(state => state.message);
    const search = useLocation().search;
    const peopleId = new URLSearchParams(search).get('id');
    const [showBeurteilungen, setShowBeurteilungen] = useState(false);
    const [showKönigin, setShowKönigin] = useState(true);
    const [showMaßnahmen, setShowMaßnahmen] = useState(false);
    const [showNotizen, setShowNotizen] = useState(false);
    const Maßnahmen = [
        { label: "Varroa-Diagnose", value: "Varroa-Diagnose" },
        { label: "Varroa-Medikamente", value: "Varroa-Medikamente" },
        { label: "Varroa-Biotechnik", value: "Varroa-Biotechnik" },
        { label: "Schwarmverhinderung", value: "Schwarmverhinderung" },
        { label: "Futtergabe", value: "Futtergabe" },
        { label: "Honigernte", value: "Honigernte" },
        { label: "Raum Management", value: "RaumManagement" }

    ];
    const [selectedValue, setSelectedValue] = useState("");

    const onChangeMatingType = (e) => {
        setAllFalse();
        setSelectedValue(e.value.replace("-",""));
        setShowMaßnahmen(true);
    }
    
    
    const setVisibility = (tab) => {
        setAllFalse();
        switch (tab) {
            case "Königin":
                setShowKönigin(true);
                break;
            case "Beurteilungen":
                setShowBeurteilungen(true);
                break;
            case "Maßnahmen":
                setShowMaßnahmen(true);
                break;
            case "Notizen":
                setShowNotizen(true);
                break;
            default:
                setAllFalse();
        }
    }

    const setAllFalse = () => {
        setShowBeurteilungen(false);
        setShowKönigin(false);
        setShowMaßnahmen(false);
        setShowNotizen(false);
    }



    return (
        <div class="container" style={{ paddingTop: "20px" }}>
            <div class="d-flex justify-content-center">
                <ListGroup horizontal>
                    <ListGroup.Item action onClick={() => { setVisibility("Königin") }}>Königin</ListGroup.Item>
                    <ListGroup.Item action onClick={() => { setVisibility("Beurteilungen") }}>Beurteilungen</ListGroup.Item>
                    <ListGroup.Item style={{width:'45em'}} action ><Select  onChange={onChangeMatingType}  defaultValue={{ label: "Maßnahmen", value: "Maßnahmen" }}
 options={Maßnahmen} />
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => { setVisibility("Notizen") }}>Notizen</ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                {
                    showBeurteilungen ? <BeuerTeilungen></BeuerTeilungen> : <></>
                }
                {
                    showNotizen ? <Notizen></Notizen> : <></>
                }
                {
                    showKönigin ? <Queen></Queen> : <></>
                }
                {
                    showMaßnahmen ? <Massnahmen peopleId={peopleId} type={selectedValue}></Massnahmen> : <></>
                }
            </div>
        </div>
    )
};
export default PeopleActivityData;