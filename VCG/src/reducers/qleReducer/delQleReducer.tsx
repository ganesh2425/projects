import { DelQleEventActions, DelQleEventState} from "../../interfaces/types";
import {delQleEventTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";


const initialState: DelQleEventState = {
    pending: false,
    error: null,
    data: {},
    id: ""
};

export default (state = initialState, action: DelQleEventActions) =>{
    switch (action.type) {
        case delQleEventTypes.FETCH_DELQLEEVENT_REQUEST:
            return {
                ...state,
                pending: true
            };
        case delQleEventTypes.FETCH_DELQLEEVENT_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload,
                error: null
            };
        case delQleEventTypes.FETCH_DELQLEEVENT_FAILURE:
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
export const getDelQleEventDetails = (state: RootState) => state.deleteqleevent.data;