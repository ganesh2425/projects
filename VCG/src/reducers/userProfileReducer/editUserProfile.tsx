import { EditUserProfileActions, EditUserProfileState} from "../../interfaces/types";
import {editUserProfileTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: EditUserProfileState = {
    pending: false,
    error: null,
    firstName:"",
    middleName:"",
    lastName:'',
    
};

export default (state = initialState, action: EditUserProfileActions) => {
    switch (action.type) {
        case editUserProfileTypes.FETCH_EDITUSERPROFILE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editUserProfileTypes.FETCH_EDITUSERPROFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editUserProfileTypes.FETCH_EDITUSERPROFILE_FAILURE:
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
export const getEditUserProfileDetails = (state: RootState) => state.editUserProfile;