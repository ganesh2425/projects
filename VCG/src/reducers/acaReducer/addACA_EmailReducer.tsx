import { AddEmailActions, AddEmailState } from "../../interfaces/types";
import { addEmailTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: AddEmailState = {
    pending: false,
    error: null,
    communicationString: "",
  communicationThrough:0
  
};

export default (state = initialState, action: AddEmailActions) => {
    {console.log(state,action,"!!!!!!")}

    switch (action.type) {

        case addEmailTypes.FETCH_ADDEMAIL_REQUEST:

            return {
                ...state,
                pending: true
            };
        case addEmailTypes.FETCH_ADDEMAIL_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addEmailTypes.FETCH_ADDEMAIL_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export const getAddEmailDetails = (state: RootState) => state.addEmail;