import { AddEmployerActions, AddEmployerState } from "../../interfaces/types";
import { addEmployerTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: AddEmployerState = {
    pending: false,
    error: null,
    id: 0,
    name: '',
    url: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zipCode: 1,
    phoneNo: '',
    phoneType: '',
    qleHomePageDescription: '',
    status: "",
    data: {}
};

export default (state = initialState, action: AddEmployerActions) => {

    switch (action.type) {

        case addEmployerTypes.FETCH_ADDEMPLOYER_REQUEST:

            return {
                ...state,
                pending: true
            };
        case addEmployerTypes.FETCH_ADDEMPLOYER_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addEmployerTypes.FETCH_ADDEMPLOYER_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}

export const getAddEmployerDetails = (state: RootState) => state.addEmployer;