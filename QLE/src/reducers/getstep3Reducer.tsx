import { GetStep3Actions, GetStep3State} from "../interfaces/types";
import {getStep3Types} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: GetStep3State = {
    pending: false,
    error: null,
    eventId: 0,
    fileName: "",
    formData:new FormData(),
    Name:'',
    Name1:'',
};

export default (state = initialState, action: GetStep3Actions) => {
    switch (action.type) {
        case getStep3Types.FETCH_GETSTEP3_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getStep3Types.FETCH_GETSTEP3_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getStep3Types.FETCH_GETSTEP3_FAILURE:
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
export const getStep3Details = (state: RootState) => state.getStep3;