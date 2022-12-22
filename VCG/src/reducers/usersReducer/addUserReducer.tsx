import { AddUserActions, AddUserState } from '../../interfaces/types';
import {addUserTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: AddUserState = {
    pending: false,
    error: null,
    id: 0,
    username:'',
    firstname: '',
    middlename: '',
    lastname: '',
    status:'',
    email: '',
    roleSet: [],
    data:{}
};

export default (state = initialState, action: AddUserActions) => {
    switch (action.type) {
        case addUserTypes.FETCH_ADDUSER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case addUserTypes.FETCH_ADDUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addUserTypes.FETCH_ADDUSER_FAILURE:
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
export const getAddUserDetails = (state: RootState) => state.addUser;