import { AllPrivilegesActions, AllPrivilegesState} from "../../interfaces/types";
import {allPrivilegesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllPrivilegesState = {
    pending: false,
    error: null,
    data:[],
    privileges:[]
};

export default (state = initialState, action: AllPrivilegesActions) => {
    switch (action.type) {
        case allPrivilegesTypes.FETCH_ALLPRIVILEGES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allPrivilegesTypes.FETCH_ALLPRIVILEGES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.privileges,
                roles: action.payload.privileges,
                error: null
            };
        case allPrivilegesTypes.FETCH_ALLPRIVILEGES_FAILURE:
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
export const getAllPrivilegesDetails = (state: RootState) => state.allPrivileges.data;