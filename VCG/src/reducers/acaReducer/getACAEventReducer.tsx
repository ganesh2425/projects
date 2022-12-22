/* eslint-disable import/no-anonymous-default-export */
import { GetACAEventState, GetACAEventActions } from "../../interfaces/types";
import { getACAEventTypes } from "../../constants/actionTypes";
import { RootState } from "../index";
import { fetchGetACAEventSuccess } from "../../actions/acaActions/getACAEventActions";

const initialState: GetACAEventState = {
  pending: false,
  error: null,
  acaEventId: 0,
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dob: "",
  ssn: "",
  email: "",
  phoneNo: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  preferredContactMethod: "",
  healthCoverageInfo: "",
  dependent1: "",
  dependent2: "",
  dependent3: "",
  dependent4: "",
  empOpenEnrollmentState: "",
  stateId: "",
  status: "",
  employerId: "",
  employerPhoneAndType: "",
  employerPrimaryContact: "",
  employerAddress: "",
  eventNotes: [],
  communicationRecords: [],
  activityList: [],
  healthPlan: {},
  stateCode: "",
  newYearChangesOneStates: [],
  newYearChangesTwoStates: [],
  whoDoesTheHealthPlanCoverStates: [],
  missOpenEnrollmentStates: [],
  data: {},
};

export default (state = initialState, action: GetACAEventActions) => {
  switch (action.type) {
    case getACAEventTypes.FETCH_GETACAEVENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case getACAEventTypes.FETCH_GETACAEVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case getACAEventTypes.FETCH_GETACAEVENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const getACAEventDetails = (state: RootState) => state.getACAEvent.data;
