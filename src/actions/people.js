import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import PeopleService from "../services/people-service";
  
  export const getPeople = (emailId) => (dispatch) => {
    return PeopleService.getPeople(emailId).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
          payload: { myBeehives: data },
        });
        return Promise.resolve(data);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: GENERIC_FAILURE,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const savePeople = (name, emailId, location, postcode) => (dispatch) => {
    return PeopleService.savePeople(name, emailId, location, postcode).then(
      () => {
        dispatch({
          type: OVERVIEW_SUCCESS
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: GENERIC_FAILURE,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const updatePeople = (id, name, location, postcode) => (dispatch) => {
    return PeopleService.updatePeople(id, name, location, postcode).then(
      () => {
        dispatch({
          type: OVERVIEW_SUCCESS
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: GENERIC_FAILURE,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };
  
  export const deletePeople = (id) => (dispatch) => {
    return PeopleService.deletePeople(id).then(
      () => {
        dispatch({
          type: OVERVIEW_SUCCESS
        });
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        dispatch({
          type: GENERIC_FAILURE,
        });
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    );
  };