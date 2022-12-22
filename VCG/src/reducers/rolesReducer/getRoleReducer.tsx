import { GetRoleActions, GetRoleState} from "../../interfaces/types";
import {getRoleTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetRoleState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    description: '',
    privilegeSet: [],
    data:{}
};

export default (state = initialState, action: GetRoleActions) => {
    switch (action.type) {
        case getRoleTypes.FETCH_GETROLE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getRoleTypes.FETCH_GETROLE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getRoleTypes.FETCH_GETROLE_FAILURE:
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
export const getRoleDetails = (state: RootState) => state.getRole;