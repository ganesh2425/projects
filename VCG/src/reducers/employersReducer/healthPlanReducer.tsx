import { EmpHealthPlanActions, EmpHealthPlanState} from "../../interfaces/types";
import {empHealthPlanTypes} from "../../constants/actionTypes";
import {RootState} from "../index";
import { string } from "yup";

const initialState: EmpHealthPlanState = {
    pending: false,
    error: null,
    response: null,
    mec: true,
    healtPlanCover: 0,
    employerSignature:'',
   
};

export default (state = initialState, action: EmpHealthPlanActions) => {
    switch (action.type) {
        case empHealthPlanTypes.FETCH_EMPHEALTHPLAN_REQUEST:
            return {
                ...state,
                pending: true
            };
        case empHealthPlanTypes.FETCH_EMPHEALTHPLAN_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data:action.payload,
                error: null
            };
        case empHealthPlanTypes.FETCH_EMPHEALTHPLAN_FAILURE:
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
export const healthplanDetails = (state: RootState) => state.healthPlan.data;