import { GetACAEmailActions, GetACAEmailState} from "../../interfaces/types";
import {getACAEmailTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetACAEmailState = {
    pending: false,
    error: null,
    
};

export default (state = initialState, action: GetACAEmailActions) => {
    

    switch (action.type) {
        case getACAEmailTypes.FETCH_GET_ACA_EMAIL_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getACAEmailTypes.FETCH_GET_ACA_EMAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getACAEmailTypes.FETCH_GET_ACA_EMAIL_FAILURE:
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
export const getACAEmailDetails = (state: RootState) => state.getACAEmail;