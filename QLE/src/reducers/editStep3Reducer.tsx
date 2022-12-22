import { EditStep3Actions, EditStep3State} from "../interfaces/types";
import {editStep3Types} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: EditStep3State = {
    pending: false,
    error: null,
    eventId: 0,
    fileName:"",
    file:"",
};

export default (state = initialState, action: EditStep3Actions) => {
    switch (action.type) {
        case editStep3Types.FETCH_EDITSTEP3_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editStep3Types.FETCH_EDITSTEP3_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editStep3Types.FETCH_EDITSTEP3_FAILURE:
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
export const getEditStep3Details = (state: RootState) => state.editStep3;