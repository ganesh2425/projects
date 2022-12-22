import { LogoutActions, LogoutState} from "../../interfaces/types";
import {logOutTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: LogoutState = {
    pending: false,
    error: null,
};

export default (state = initialState, action: LogoutActions) => {
    switch (action.type) {
        case logOutTypes.FETCH_LOGOUT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case logOutTypes.FETCH_LOGOUT_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case logOutTypes.FETCH_LOGOUT_FAILURE:
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
export const getLogoutDetails = (state: RootState) => state.logOut;