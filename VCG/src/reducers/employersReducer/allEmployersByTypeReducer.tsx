import { AllEmployersByTypeActions, AllEmployersByTypeState} from "../../interfaces/types";
import {allActiveEmployersTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: AllEmployersByTypeState = {
    pending: false,
    error: null,
    data:[],
    employer:[]
};

export default (state = initialState, action: AllEmployersByTypeActions) => {
  
    switch (action.type) {
        case allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_REQUEST:
            return {
                ...state,
                pending: true
            };
        case allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload.employer,
                employer: action.payload.employer,
                error: null
            };
        case allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
                // data:action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getAllEmployerByTypeDetails = (state: RootState) => state.allEmployersByType.data;