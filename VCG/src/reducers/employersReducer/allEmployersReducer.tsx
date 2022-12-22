import { AllEmployersActions, AllEmployersState} from "../../interfaces/types";
import {allEmployersTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: AllEmployersState = {
    pending: false,
    error: null,
    data:[],
    employer:[]
};

export default (state = initialState, action: AllEmployersActions) => {
  
    switch (action.type) {
        case allEmployersTypes.FETCH_ALLEMPLOYERS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allEmployersTypes.FETCH_ALLEMPLOYERS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.employer,
                employer: action.payload.employer,
                error: null
            };
        case allEmployersTypes.FETCH_ALLEMPLOYERS_FAILURE:
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
export const getAllEmployerDetails = (state: RootState) => state.allEmployers.data;