import { DelUserActions, DelUserState} from "../../interfaces/types";
import {delUserTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: DelUserState = {
    pending: false,
    error: null,
    data: ""
};

export default (state = initialState, action: DelUserActions) => {
    switch (action.type) {
        case delUserTypes.FETCH_DELUSER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case delUserTypes.FETCH_DELUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case delUserTypes.FETCH_DELUSER_FAILURE:
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
export const delUserDetails = (state: RootState) => state.delUser;