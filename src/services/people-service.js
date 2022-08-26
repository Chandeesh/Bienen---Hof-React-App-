import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/beehive/people";

const getPeople = (emailId) => {
    return axios.get(API_URL + "/" + emailId, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const savePeople = (beehiveId, location, designation) => {
    return axios.post(API_URL, {
        beehiveId,
        location,
        designation
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updatePeople = (id, location, designation) => {
    return axios.put(API_URL, {
        id,
        location,
        designation
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deletePeople = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

export default {
    getPeople,
    savePeople,
    updatePeople,
    deletePeople
};