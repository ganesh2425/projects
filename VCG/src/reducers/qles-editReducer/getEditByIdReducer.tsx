import { GetEditByIdActions, GetEditByIdState} from "../../interfaces/types";
import {getEditByIdTypes} from "../../constants/actionTypes";
import {RootState} from "../index";

const initialState: GetEditByIdState = {
    pending: false,
    error: null,
    id: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    SSN: '',
    event1: '',
    event2: '',
    email: '',
    number: '',
    dob: '',
    eventStatus: '',
    uniqueLink: '',
    dependentDetails: [],
    benefitDetails: {},
    qleEventActivity: [],
    eventid: '',
    eventsubid: '',
    data: {},
    uploadedDocList: [],
    evntDate: '',
};

export default (state = initialState, action: GetEditByIdActions) => { console.log(action);
    switch (action.type) {
        case getEditByIdTypes.FETCH_GETEDITBYID_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getEditByIdTypes.FETCH_GETEDITBYID_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getEditByIdTypes.FETCH_GETEDITBYID_FAILURE:
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
export const getEditByIdDetails = (state: RootState) => state.getEditById.data;