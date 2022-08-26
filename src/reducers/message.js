import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/type";
const initialState = {};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log("Action "+action.type);
    switch (type) {
        case SET_MESSAGE:
            return { message: payload };
        case CLEAR_MESSAGE:
            return { message: payload };
        default:
            return state;
    }
}