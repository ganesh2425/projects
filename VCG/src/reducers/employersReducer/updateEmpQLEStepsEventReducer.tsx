import { UpdateEmpQLEStepsEventActions, UpdateEmpQLEStepsEventState } from "../../interfaces/types";
import { updateEmpQLEStepsEventTypes } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: UpdateEmpQLEStepsEventState = {
  pending: false,
  error: null,
  id:0,
  name: '',
  url:'',
  ein:'',
  address:'',
  city:'',
  state:'',
  zipCode:0,
  phoneNo:'',
  phoneType:'',
  status:'',
  qleHomePageDescription:'',
  qleContactCertDescriptionStep1:'',
  qleCertDescriptionStep1:'',
  qleEventTypes: [],
  qlePlan: [],
  qleEnabled: true,
  qleDisclaimerStep1: '',
  qleWhatBenefitChangesStep2:'',
  qleWhoChangedBenefitStep2:'',
  qleDisclaimerStep2:'',
  acaEnabled: true,
  acaEmployerWontOfferHealthcover: true,
  acaEmployerHealthcoverToEmployee: true,
  acaEmployeePremiumForPlan: 0,
  acaHomepageDescription: "",
  acaPrimaryContactName: "",
  acaPrimaryContactEmail: "",
  acaPrimaryContactPhoneNo: "",
  acaPrimaryContactPhoneType: "",
  acaPrivacyPolicy: "",
};

export default (state = initialState, action: UpdateEmpQLEStepsEventActions) => {
  switch (action.type) {
    case updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_FAILURE:
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
export const getUpdateEmpQLEStepsEvent = (state: RootState) => state.updateEmpQLEStepsEvent;
