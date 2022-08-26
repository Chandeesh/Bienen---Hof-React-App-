import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import PeopleDataService from "../services/people-data-service";
  
  export const getPeopleData = (peopleId) => (dispatch) => {
    return PeopleDataService.getPeopleData(peopleId).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
          payload: { peopleData: data },
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

  export const postPeopleData = (peopleId,values) => (dispatch) => {
    return PeopleDataService.postPeopleData(peopleId,values).then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
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

  export const deletePeopleData = (id) => (dispatch) => {
    return PeopleDataService.deletePeopleData(id).then(
      () => {
        dispatch({
          type: OVERVIEW_SUCCESS,
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
