import { GetUserProfileActions, GetUserProfileState} from "../../interfaces/types";
import {getUserProfileTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: GetUserProfileState = {
    pending: false,
    error: null,
    userProfile:[],
    data: []
};

export default (state = initialState, action: GetUserProfileActions) => {
  
    switch (action.type) {
        case getUserProfileTypes.FETCH_GETUSERPROFILE_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getUserProfileTypes.FETCH_GETUSERPROFILE_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.userProfile,
                userProfile: action.payload.userProfile,
                error: null
            };
        case getUserProfileTypes.FETCH_GETUSERPROFILE_FAILURE:
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
export const getUserProfileDetails = (state: RootState) => state.getUserProfile.data;