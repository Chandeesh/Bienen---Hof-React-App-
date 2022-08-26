import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import QueenDataService from "../services/queen-service";
  
  export const getQueenData = (peopleId) => (dispatch) => {
    return QueenDataService.getQueenData(peopleId).then(
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

  export const createQueenData = (peopleId, designation, year, marked, origin, matingType) => (dispatch) => {
    return QueenDataService.postQueenData(peopleId, designation, year, marked, origin, matingType).then(
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

  export const deleteQueenData = (id) => (dispatch) => {
    return QueenDataService.deleteQueenData(id).then(
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

  export const updateQueenData = (id, peopleId, designation, year, marked, origin, matingType) => (dispatch) => {
    return QueenDataService.updateQueenData(id, peopleId, designation, year, marked, origin, matingType).then(
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