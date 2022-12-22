import { EditUserActions, EditUserState} from "../../interfaces/types";
import {editUserTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: EditUserState = {
    pending: false,
    error: null,
    id: 0,
    username:'',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    status:'',
    roleSet: [],
    data:{}
};

export default (state = initialState, action: EditUserActions) => {
    switch (action.type) {
        case editUserTypes.FETCH_EDITUSER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editUserTypes.FETCH_EDITUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editUserTypes.FETCH_EDITUSER_FAILURE:
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
export const getEditUserDetails = (state: RootState) => state.editUser;