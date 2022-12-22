import { AllRolesActions, AllRolesState} from "../../interfaces/types";
import {allRolesTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllRolesState = {
    pending: false,
    error: null,
    data:[],
    roles:[]
};

export default (state = initialState, action: AllRolesActions) => {
    switch (action.type) {
        case allRolesTypes.FETCH_ALLROLES_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allRolesTypes.FETCH_ALLROLES_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.roles,
                roles: action.payload.roles,
                error: null
            };
        case allRolesTypes.FETCH_ALLROLES_FAILURE:
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
export const getAllRolesDetails = (state: RootState) => state.allRoles.data;