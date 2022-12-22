import { EditRoleActions, EditRoleState} from "../../interfaces/types";
import {editRoleTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditRoleState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    description: '',
    privilegeSet: [],
    data:{}
};

export default (state = initialState, action: EditRoleActions) => {
    switch (action.type) {
        case editRoleTypes.FETCH_EDITROLE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editRoleTypes.FETCH_EDITROLE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editRoleTypes.FETCH_EDITROLE_FAILURE:
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
export const getEditRoleDetails = (state: RootState) => state.editRole;