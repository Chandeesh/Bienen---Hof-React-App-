import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/people/data";

const getPeopleData = (peopleId) => {
    return axios.get(API_URL + "/" + peopleId, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const postPeopleData = (peopleId, values) => {
    return axios.post(API_URL, {
        peopleId,
        values
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deletePeopleData = (id) => {
    return axios.delete(API_URL + "/" + id,
    { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

export default {
    getPeopleData,
    postPeopleData,
    deletePeopleData
};