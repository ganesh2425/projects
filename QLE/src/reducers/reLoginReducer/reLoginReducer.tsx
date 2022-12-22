import { reLoginActions, reLoginState} from "../../interfaces/types";
import {reLoginTypes} from "../../constants/actionTypes";
import {RootState} from "./../index";

const initialState: reLoginState = {
    pending: false,
    error: null,
};

export default (state = initialState, action: reLoginActions) => {
    switch (action.type) {
        case reLoginTypes.FETCH_RELOGIN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case reLoginTypes.FETCH_RELOGIN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case reLoginTypes.FETCH_RELOGIN_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getReLoginDetails = (state: RootState) => state.reAuth;