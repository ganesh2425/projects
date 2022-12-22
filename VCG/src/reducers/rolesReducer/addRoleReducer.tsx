import { AddRoleActions, AddRoleState} from "../../interfaces/types";
import {addRoleTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AddRoleState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    description: '',
    privilegeSet: [],
    data:{}
};

export default (state = initialState, action: AddRoleActions) => {
    switch (action.type) {
        case addRoleTypes.FETCH_ADDROLE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case addRoleTypes.FETCH_ADDROLE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addRoleTypes.FETCH_ADDROLE_FAILURE:
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
export const getAddRoleDetails = (state: RootState) => state.addRole;