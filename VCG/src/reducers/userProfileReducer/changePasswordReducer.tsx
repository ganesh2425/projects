import { ChangeUserProfilePasswordActions, changeUserProfilePasswordState} from "../../interfaces/types";
import {changeUserProfilePasswordTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: changeUserProfilePasswordState = {
    pending: false,
    error: null,
    password:"",
    confirmPassword:"",
    
    
};

export default (state = initialState, action: ChangeUserProfilePasswordActions) => {
    switch (action.type) {
        case changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_FAILURE:
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
export const ChangeUserProfilePasswordDetails = (state: RootState) => state.changeUserProfilePassword;