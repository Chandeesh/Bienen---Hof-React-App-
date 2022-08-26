import {
    SET_MESSAGE,
    OVERVIEW_SUCCESS,
    GENERIC_FAILURE
  } from "./type";
  import OverviewService from "../services/overview-service";
  
  export const getContacts = () => (dispatch) => {
    return OverviewService.getContacts().then(
      (data) => {
        dispatch({
          type: OVERVIEW_SUCCESS,
          payload: { contacts: data },
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