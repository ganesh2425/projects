import { PlanActions, PlanState} from "../interfaces/types";
import {planTypes} from "../constants/actionTypes";
import {RootState} from "./index";
import { string } from "yup";

const initialState: PlanState = {
    pending: false,
    error: null,
    response: null,
    
   
};

export default (state = initialState, action: PlanActions) => {
    switch (action.type) {
        case planTypes.FETCH_PLAN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case planTypes.FETCH_PLAN_SUCCESS:
            return {
                ...state,
                pending: false,
                response: action.payload,
                error: null
            };
        case planTypes.FETCH_PLAN_FAILURE:
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
export const getPlanDetails = (state: RootState) => state.plan;