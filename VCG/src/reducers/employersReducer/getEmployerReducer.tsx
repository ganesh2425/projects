import { GetEmployerActions, GetEmployerState} from "../../interfaces/types";
import {getEmployerTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetEmployerState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    url:'',
    ein:'',
    address:'',
    city:'',
    state:'',
    zipCode:0,
    phoneNo:'',
    phoneType:'',
    qleHomePageDescription:'',
    qleEventTypes:[],
    qlePlan:[],
    qleEnabled:false,
    acaEnabled:false,
    acaEmployerWontOfferHealthcover:false,
    acaEmployerHealthcoverEmployee:false,
    status:"",
   
};

export default (state = initialState, action: GetEmployerActions) => {
   
    switch (action.type) {
        
        case getEmployerTypes.FETCH_GETEMPLOYER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getEmployerTypes.FETCH_GETEMPLOYER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getEmployerTypes.FETCH_GETEMPLOYER_FAILURE:
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
export const getEmployerDetails = (state: RootState) => state.getEmployer;