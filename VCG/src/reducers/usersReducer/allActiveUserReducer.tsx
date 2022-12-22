import { ActiveUserActions, UserState} from "../../interfaces/types";
import {ActiveUserTypes} from "../../constants/actionTypes";

import {RootState} from "../index";
// import { string } from "yup";

const initialState: UserState = {
    pending: false,
    error: null,
    data:[],
    roleSet:[],
    

};

export default (state = initialState, action: ActiveUserActions) => {

    switch (action.type) {
        case ActiveUserTypes.FETCH_ACTIVE_USER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case ActiveUserTypes.FETCH_ACTIVE_USER_SUCCESS:
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
export const getActiveUSERDetails = (state: RootState) => state.UserState.data;