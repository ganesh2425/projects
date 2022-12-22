import { SlugActions, SlugState} from "../interfaces/types";
import {slugTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: SlugState = {
    pending: false,
    error: null,
    name: "",
    response: null,
};

export default (state = initialState, action: SlugActions) => {
    switch (action.type) {
        case slugTypes.FETCH_SLUG_REQUEST:
            return {
                ...state,
                pending: true
            };
        case slugTypes.FETCH_SLUG_SUCCESS:
            return {
                ...state,
                pending: false,
                response: action.payload,
                error: null
            };
        case slugTypes.FETCH_SLUG_FAILURE:
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
export const getEmployerDetailsBySlug = (state: RootState) => state.employerBySlug;