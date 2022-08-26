import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/bienen/people/queen";

const getQueenData = (peopleId) => {
    return axios.get(API_URL + "/" + peopleId, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const postQueenData = (peopleId, designation, year, marked, origin, matingType) => {
    return axios.post(API_URL, {
        peopleId,
        designation,
        year,
        marked,
        origin,
        matingType
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

const deleteQueenData = (id) => {
    return axios.delete(API_URL + "/" + id,
    { headers: authHeader() }).then((response) => {
        return response.data;
    });
};

const updateQueenData = (id, peopleId, designation, year, marked, origin, matingType) => {
    return axios.put(API_URL, {
        id,
        peopleId,
        designation,
        year,
        marked,
        origin,
        matingType
    }, { headers: authHeader() }).then((response) => {
        return response.data;
    });;
};

export default {
    getQueenData,
    postQueenData,
    deleteQueenData,
    updateQueenData
};