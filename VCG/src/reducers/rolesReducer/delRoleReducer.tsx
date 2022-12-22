import { DelRoleActions, DelRoleState} from "../../interfaces/types";
import {delRoleTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: DelRoleState = {
    pending: false,
    error: null,
    data: ""
};

export default (state = initialState, action: DelRoleActions) => {
    switch (action.type) {
        case delRoleTypes.FETCH_DELROLE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case delRoleTypes.FETCH_DELROLE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case delRoleTypes.FETCH_DELROLE_FAILURE:
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
export const delRoleDetails = (state: RootState) => state.delRole;