import { CommunicationActions, CommunicationState} from "../../interfaces/types";
import {communicationTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";

const initialState: CommunicationState = {
    pending: false,
    error: null,
    length: 0,
    id: 0,
    communications: [],
    data: [],
};

export default (state = initialState, action: CommunicationActions) => { console.log(action);console.log(state)
    switch (action.type) {
        case communicationTypes.FETCH_COMMUNICATION_REQUEST:
            return {
                ...state,
                pending: true
            };
        case communicationTypes.FETCH_COMMUNICATION_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload.communicationDetails,
                error: null
            };
        case communicationTypes.FETCH_COMMUNICATION_FAILURE:
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
export const getcommunicationDetails = (state: RootState) => state.communication.data;