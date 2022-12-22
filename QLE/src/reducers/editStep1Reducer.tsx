import { EditStep1Actions, EditStep1State} from "../interfaces/types";
import {editStep1Types} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: EditStep1State = {
    pending: false,
    error: null,
    eventId: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    ssn: "",
    evntDate: "",
    eventTypeId: "",
    remViaTxt: "",
    email: "",
    phoneNo: "",
    eventSubTypeId: "",
};

export default (state = initialState, action: EditStep1Actions) => {
    switch (action.type) {
        case editStep1Types.FETCH_EDITSTEP1_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editStep1Types.FETCH_EDITSTEP1_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editStep1Types.FETCH_EDITSTEP1_FAILURE:
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
export const getEditStep1Details = (state: RootState) => state.editStep1;