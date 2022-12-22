import { AllRolesetActions, AllRolesetState} from "../../interfaces/types";
import {allRolesetTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AllRolesetState = {
    pending: false,
    error: null,
    data:[],
    roleSet:[]
};

export default (state = initialState, action: AllRolesetActions) => {
    switch (action.type) {
        case allRolesetTypes.FETCH_ALLROLESET_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allRolesetTypes.FETCH_ALLROLESET_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.roleSet,
                users: action.payload.roleSet,
                error: null
            };
        case allRolesetTypes.FETCH_ALLROLESET_FAILURE:
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
export const getAllRolesetDetails = (state: RootState) => state.allRoleset.data;