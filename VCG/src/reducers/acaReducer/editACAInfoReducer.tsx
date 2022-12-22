/* eslint-disable import/no-anonymous-default-export */
import { EditACAInfoActions, EditACAInfoState } from "../../interfaces/types";
import { editACAInfoTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: EditACAInfoState = {
  pending: false,
  error: null,
  acaEventId: 0,
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  ssn: "",
  dob: "",
  address: "",
  city: "",
  zip: "",
  dependent1: "",
  preferredContactMethod: "",
  healthCoverageInfo: "",
  empOpenEnrollmentState: "",
  stateId: "",
  dependent2: "",
  dependent3: "",
  dependent4: "",
  status: "",
  data: {},
};

export default (state = initialState, action: EditACAInfoActions) => {
  switch (action.type) {
    case editACAInfoTypes.FETCH_EDITACAINFO_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case editACAInfoTypes.FETCH_EDITACAINFO_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
      };
    case editACAInfoTypes.FETCH_EDITACAINFO_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getEditACAInfoDetails = (state: RootState) => state.editACA.data;
