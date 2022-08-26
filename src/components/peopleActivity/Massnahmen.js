import React, { useState, useEffect } from "react";
import { getMassNahmenData } from "../../actions/massnahmen";
import { useDispatch } from "react-redux";
import VarroaDiagnose from "./massnahmenData/VarroaDiagnose"
import VarroaMedikamente from "./massnahmenData/VarroaMedikamente"
import VarroaBiotechnik from "./massnahmenData/VarroaBiotechnik"
import Schwarmverhinderung from "./massnahmenData/Schwarmverhinderung"
import Futtergabe from "./massnahmenData/Futtergabe"
import RaumManagement from "./massnahmenData/Raummanagement"
import Honigernte from "./massnahmenData/Honigernte"

const Massnahmen = (props) => {

    const dispatch = useDispatch();
    const [varroaDiagnose, setShowVarroaDiagnose] = useState(false);
    const [varroaMedikamente, setShowVarroaMedikamente] = useState(false);
    const [varroaBiotechnik, setShowVarroaBiotechnik] = useState(false);
    const [schwarmverhinderung, setShowSchwarmverhinderung] = useState(false);
    const [futtergabe, setShowFuttergabe] = useState(false);
    const [honigernte, setShowHonigernte] = useState(false);
    const [raumManagement, setShowRaumManagement] = useState(false);
    const [massnahmenData, setMassnahmenData] = useState({});

    const setVisibility = (tab) => {
        console.log(tab);
        setAllFalse();
        switch (tab) {
            case "VarroaDiagnose":
                setShowVarroaDiagnose(true);
                break;
            case "VarroaMedikamente":
                setShowVarroaMedikamente(true);
                break;
            case "VarroaBiotechnik":
                setShowVarroaBiotechnik(true);
                break;
            case "Schwarmverhinderung":
                setShowSchwarmverhinderung(true);
                break;
            case "Futtergabe":
                setShowFuttergabe(true);
                break;
            case "Honigernte":
                setShowHonigernte(true);
                break;
            case "RaumManagement":
                setShowRaumManagement(true);
                break;
            default:
                setAllFalse();
        }
    }

    const setAllFalse = () => {
        setShowVarroaDiagnose(false);
        setShowVarroaMedikamente(false);
        setShowVarroaBiotechnik(false);
        setShowSchwarmverhinderung(false);
        setShowSchwarmverhinderung(false);
        setShowFuttergabe(false);
        setShowHonigernte(false);
        setShowSchwarmverhinderung(false);
        setShowRaumManagement(false);
    }

    const getMassnahmenDatas = () => {
        dispatch(getMassNahmenData(props.peopleId))
            .then((response) => {
                setMassnahmenData(response);
            })
            .catch(() => {
            });
    }

    useEffect(() => {
        // Update the document title using the browser API
        getMassnahmenDatas();
        setVisibility(props.type);
    }, [props.type]);


    return (
        <div>
            {
                <>
                    {
                        varroaDiagnose ? <VarroaDiagnose data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></VarroaDiagnose> : <></>
                    }
                    {
                        varroaMedikamente? <VarroaMedikamente data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></VarroaMedikamente>:<></>
                    }
                    {
                        varroaBiotechnik? <VarroaBiotechnik data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></VarroaBiotechnik>:<></>
                    }
                    {
                        schwarmverhinderung? <Schwarmverhinderung data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></Schwarmverhinderung>:<></>
                    }
                    {
                        futtergabe? <Futtergabe data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></Futtergabe>:<></>
                    }
                    {
                        honigernte? <Honigernte data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></Honigernte>:<></>
                    }
                    {
                        raumManagement? <RaumManagement data={massnahmenData[0]} peopleId={props.peopleId} onChangeMainData={getMassnahmenDatas}></RaumManagement>:<></>
                    }
                </> 
            }
        </div>
    )
};

export default Massnahmen;