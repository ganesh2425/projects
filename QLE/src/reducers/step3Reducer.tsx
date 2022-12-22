import { STEP3Actions, STEP3State} from "../interfaces/types";
import {step3Types} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: STEP3State = {
    pending: false,
    error: null,
    data: [],
    response: null,
    fileName:"",
    file:"",
    // cnfNumber:any,
    eventId:0,
    uploadedFileList: [],
};

export default (state = initialState, action: STEP3Actions) => {

    switch (action.type) {
        case step3Types.FETCH_STEP3_REQUEST:
            return {
                ...state,
                pending: true
            };
        case step3Types.FETCH_STEP3_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case step3Types.FETCH_STEP3_FAILURE:
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
export const getSTEP3EnteredDetails = (state: RootState) => state.step3.data;