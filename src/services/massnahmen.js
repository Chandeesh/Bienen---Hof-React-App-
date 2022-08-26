import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/massnahmen/data";

const getMassNahmenData = (peopleId) => {
    return axios.get(API_URL + "/" + peopleId, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const postMassNahmenData = (peopleId, data) => {
    return axios.post(API_URL, {
        peopleId,
        data
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const updateMassNahmenData = (peopleId, dataId, data) => {
    return axios.put(API_URL, {
        peopleId,
        dataId,
        data
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deleteMassNahmenData = (id, dataId, key) => {
    return axios.delete(API_URL + "/" + id + "/" + dataId + "/" + key,
    { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

export default {
    getMassNahmenData,
    postMassNahmenData,
    updateMassNahmenData,
    deleteMassNahmenData
};