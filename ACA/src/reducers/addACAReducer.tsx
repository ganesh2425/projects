import { AddACAActions, AddACAState} from "../interfaces/types";
import {addACATypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: AddACAState = {
    pending: false,
    error: null,
    response: null,
    firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  dob: '',
  ssn: '',
  address: '',
  city: '',
  stateId: '',
  zip: '',
  email: '',
  phoneNo: '',
  dependent1: '',
  dependent2: '',
  dependent3: '',
  dependent4: '',
  preferredContactMethod: '',
  healthCoverageInfo: '',
  empOpenEnrollmentState: '',
  otp:'',
    data:{}
};

export default (state = initialState, action: AddACAActions) => {
    switch (action.type) {
        case addACATypes.FETCH_ACA_REQUEST:
            return {
                ...state,
                pending: true
            };
        case addACATypes.FETCH_ACA_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                error: null
            };
        case addACATypes.FETCH_ACA_FAILURE:
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
export const getAddACADetails = (state: RootState) => state.addACA;