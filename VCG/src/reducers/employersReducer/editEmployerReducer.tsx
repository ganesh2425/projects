import { EditEmployerActions, EditEmployerState} from "../../interfaces/types";
import {editEmployerTypes} from "../../constants/actionTypes";
import {RootState} from "../index";


const initialState: EditEmployerState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    url:'',
    ein:"",
    address:"",
    city:"",
    state:"",
    zipCode:0,
    phoneNo:"",
    phoneType:"",
    qleHomePageDescription:"",
    qleEventTypes:[],
    qlePlan:[],
    status:"",
    qleEnabled:false,
    acaEnabled:false,
    data:{}
};

export default (state = initialState, action: EditEmployerActions) => {
    switch (action.type) {
        case editEmployerTypes.FETCH_EDITEMPLOYER_REQUEST:
            return {
                ...state,
                pending: true
            };
        case editEmployerTypes.FETCH_EDITEMPLOYER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case editEmployerTypes.FETCH_EDITEMPLOYER_FAILURE:
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
export const getEditEmployerDetails = (state: RootState) => state.editEmployer;