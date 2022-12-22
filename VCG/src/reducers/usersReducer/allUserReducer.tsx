import { UserActions, UserState} from "../../interfaces/types";
import {UserTypes} from "../../constants/actionTypes";

import {RootState} from "../index";
// import { string } from "yup";

const initialState: UserState = {
    pending: false,
    error: null,
    data:[],
    roleSet:[],
    

};

export default (state = initialState, action: UserActions) => {

    switch (action.type) {
        case UserTypes.FETCH_USER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case UserTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.users,
                error: null
            };
        // case UserTypes.FETCH_USER_FAILURE:
        //     return {
        //         ...state,
        //         pending: false,
        //         error: action.payload.error
        //     };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUSERDetails = (state: RootState) => state.UserState.data;