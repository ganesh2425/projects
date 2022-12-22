import { GetUserActions, GetUserState} from "../../interfaces/types";
import {getUserTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetUserState = {
    pending: false,
    error: null,
    id: 0,
    username:'',
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    roleSet: [],
    data:{}
};

export default (state = initialState, action: GetUserActions) => {console.log(state);console.log(action)
    switch (action.type) {
        case getUserTypes.FETCH_GETUSER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getUserTypes.FETCH_GETUSER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getUserTypes.FETCH_GETUSER_FAILURE:
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
export const getGetUserDetails = (state: RootState) => state.getUser;