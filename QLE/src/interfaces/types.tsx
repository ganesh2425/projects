import { loginTypes, otpTypes, resendOTPTypes, homeTypes, faqTypes, step1Types, eventsTypes
  ,getStep1Types, editStep1Types, employerTypes, reLoginTypes, step2Types
  ,planTypes
  ,editStep3Types, getStep3Types,step3Types,viewFileTypes, step2CancelTypes, PrivacypolicyTypes,slugTypes} from "../constants/actionTypes";

// Login
export interface LoginState {
  pending: boolean;
  error: string | null;
  accessToken: string;
}

export interface Login {
  email: string;
  mobile: string;
  isCaptchaVerified: number;
}

export interface AuthResponse {
  token: string;
}

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchLoginRequest {
  type: typeof loginTypes.FETCH_LOGIN_REQUEST;
  payload: Login;
}

export type FetchLoginSuccess = {
  type: typeof loginTypes.FETCH_LOGIN_SUCCESS;
  payload: AuthResponse;
};

export type FetchLoginFailure = {
  type: typeof loginTypes.FETCH_LOGIN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type LoginActions =
  | FetchLoginRequest
  | FetchLoginSuccess
  | FetchLoginFailure;

//OTP
export interface FetchOTPRequest {
  type: typeof otpTypes.FETCH_OTP_REQUEST;
  payload: any;
}

export type FetchOTPSuccess = {
  type: typeof otpTypes.FETCH_OTP_SUCCESS;
  payload: any;
};

export type FetchOTPFailure = {
  type: typeof otpTypes.FETCH_OTP_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type OTPActions =
  | FetchOTPRequest
  | FetchOTPSuccess
  | FetchOTPFailure;

export interface OTPState {
  pending: boolean;
  error: string | null;
  email: string;
  phoneNo: string,
  contactCertificationBox: string,
  qleCertificationBox: string,
  disclaimer:string,
  otp:string,
}

export interface OTP {
  accessToken: string;
  otp: string;
}

//RESEND OTP
export interface FetchResendOTPRequest {
  type: typeof resendOTPTypes.FETCH_RESEND_OTP_REQUEST;
  payload: any;
}

export type FetchResendOTPSuccess = {
  type: typeof resendOTPTypes.FETCH_RESEND_OTP_SUCCESS;
  payload: any;
};

export type FetchResendOTPFailure = {
  type: typeof resendOTPTypes.FETCH_RESEND_OTP_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type ResendOTPActions =
  | FetchResendOTPRequest
  | FetchResendOTPSuccess
  | FetchResendOTPFailure;

export interface ResendOTPState {
  pending: boolean;
  error: string | null;
  isSuccess: boolean;
  // email: string;
  // phoneNo: string,
  // contactCertificationBox: string,
  // qleCertificationBox: string,
  // disclaimer:string,
}

export interface ResendOTP {
  accessToken: string;
  otp: string;
}

// home

export interface FetchHOMERequest {
  type: typeof homeTypes.FETCH_HOME_REQUEST;
  payload: any;
}

export type FetchHOMESuccess = {
  type: typeof homeTypes.FETCH_HOME_SUCCESS;
  payload: any;
};

export type FetchHOMEFailure = {
  type: typeof homeTypes.FETCH_HOME_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type HOMEActions =
  | FetchHOMERequest
  | FetchHOMESuccess
  | FetchHOMEFailure;

export interface HOMEState {
  pending: boolean;
  error: string | null;
  qleHomePageDescription: string;
}
//FAQ

export interface FetchFAQRequest {
  type: typeof faqTypes.FETCH_FAQ_REQUEST;
  payload: any;
}

export type FetchFAQSuccess = {
  type: typeof faqTypes.FETCH_FAQ_SUCCESS;
  payload: any;
};

export type FetchFAQFailure = {
  type: typeof faqTypes.FETCH_FAQ_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type FAQActions =
  | FetchFAQRequest
  | FetchFAQSuccess
  | FetchFAQFailure;

export interface FAQState {
  pending: boolean;
  error: string | null;
  data: any;
}

// add step1

export interface Istep1Form {
  eventId: number;
  firstName: string
  lastName: string
  middleName: string
  ssn: string
  evntDate: string
  email: any
  eventTypeId: string,
  remViaTxt: string,
  phoneNo: string
  eventSubTypeId: string,
  confirmationNumber:string,
  otp:string,
}

export interface FetchSTEP1Request {
  type: typeof step1Types.FETCH_STEP1_REQUEST;
  payload: any;
}

export type FetchSTEP1Success = {
  type: typeof step1Types.FETCH_STEP1_SUCCESS;
  payload: any;
};

export type FetchSTEP1Failure = {
  type: typeof step1Types.FETCH_STEP1_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type STEP1Actions =
  | FetchSTEP1Request
  | FetchSTEP1Success
  | FetchSTEP1Failure;

export interface STEP1State {
  pending: boolean;
  error: string | null;
  data: any;
}

//Get Step1 By EventId

export interface GetStep1State {
  pending: boolean;
  error: string | null;
  eventId: number;
  confirmationNumber: string;
  firstName: string,
  middleName: string,
  lastName: string,
  name: string,
  email: string,
  phoneNo: string,
  otp:string,
  ssn: string,
  eventTypeId: string,
  eventSubTypeId: string,
  evntDate: string,
  remViaTxt: string,
  accessibleBenefits: [],
  qleWhatBenefitChangesStep2: string,
  qleWhoChangedBenefitStep2: string,
  qleDisclaimerStep2: string,
  step1QleCertificationBox: string,
  step1QleContactBox: string,
  step1QleDisclaimer: string,
  step:number,
  eventType: string,
  eventSubType: string,
  step3ImportantNote: string,
  step3DocumentCovered: string,
  documents:[],
  token:string,
  // enrollOrChange: number;
  enrollOrCancel: number,
  dependentOption: number,
  optionalMedFsa: string,
  optionalAllTierMedHsa: string,
  optionalEmpOnlyHsa: string,
  dependentAnnualFsa: string,
  cancelHealthFsa: string,
  cancelAllHealthCoverHsa: string,
  cancelEmpHealthCoverHsa: string,
  cancelDependentFsa: string,
  optMedAmount:string,

  benefitDetails:{
  medPlanId: string,
  medPlanName: string,
  comments: string,
  medCoverageTier: string,
  optMedFsa: string,
  optMedHsa: string;
  dentPlanId: string,
  dentPlanName: string;
  dentCoverageTier: string,
  visionPlanId: string,
  visionPlanName: string,
  visionCoverageTier: string,
  annualFsa: string,
  dependentFsa: string,
  dependentSet: any[],

  //cancel related
  cancelMedical: boolean,
  cancelVision: boolean,
  cancelDental:boolean,
  cancelDependentFsa: boolean,
  cancelEmployee: boolean,
  cancelSpouse: boolean,
  cancelDomesticPartner: boolean,
  employee: string;
  spouse: string,
  domesticPartner: string,
  cancelChild: boolean,
  child: any[],
  cancelSpouseChild: boolean,
  cancelDomesticPartnerChild: boolean,
  cancelHealthAnnualFsa: string,
  cancelCoverHealthAnnualHsa: string,
  cancelEmployeeHsa: string,
  cancelDependentAnnualFsa: string,
  domesticPartnersChild: any[],
  },
  commenterName: string,
  //status for last step completion
  status: string,
}

export interface FetchGetStep1Request {
  type: typeof getStep1Types.FETCH_GETSTEP1_REQUEST;
  payload: any;
}

export interface FetchGetStep1SuccessPayload {
  eventId: number;
  confirmationNumber: string;
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNo: string,
  ssn: string,
  eventTypeId: string,
  evntDate: string,
  remViaTxt: string,
  accessibleBenefits: [],
  qleWhatBenefitChangesStep2: string,
  qleDisclaimerStep2: string,
}

export type FetchGetStep1Success = {
  type: typeof getStep1Types.FETCH_GETSTEP1_SUCCESS;
  payload: FetchGetStep1SuccessPayload;
};

export type FetchGetStep1Failure = {
  type: typeof getStep1Types.FETCH_GETSTEP1_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetStep1Actions =
  | FetchGetStep1Request
  | FetchGetStep1Success
  | FetchGetStep1Failure;

export interface GetStep1Response {
  data: {};
}

//edit step1
export interface EditStep1State {
  pending: boolean;
  error: string | null;
  eventId: number;
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNo: string,
  ssn: string,
  eventTypeId: string,
  eventSubTypeId: string,
  evntDate: string,
  remViaTxt: string,
 }

export interface EditStep1 {
  eventId: number;
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNo: string,
  ssn: string,
  eventTypeId: string,
  eventSubTypeId: string,
  evntDate: string,
  remViaTxt: string,
}

export interface FetchEditStep1Request {
  type: typeof editStep1Types.FETCH_EDITSTEP1_REQUEST;
  payload: EditStep1;
}

export type FetchEditStep1Success = {
  type: typeof editStep1Types.FETCH_EDITSTEP1_SUCCESS;
  payload: FetchEditStep1SuccessPayload;
};

export interface FetchEditStep1SuccessPayload {
  eventId: number;
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNo: string,
  ssn: string,
  eventTypeId: string,
  eventSubTypeId: string,
  evntDate: string,
  remViaTxt: string,
}

export type FetchEditStep1Failure = {
  type: typeof editStep1Types.FETCH_EDITSTEP1_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditStep1Actions =
  | FetchEditStep1Request
  | FetchEditStep1Success
  | FetchEditStep1Failure;

// events

export interface FetchEVENTSRequest {
  type: typeof eventsTypes.FETCH_EVENTS_REQUEST;
  payload: any;
}

export type FetchEVENTSSuccess = {
  type: typeof eventsTypes.FETCH_EVENTS_SUCCESS;
  payload: any;
};

export type FetchEVENTSFailure = {
  type: typeof eventsTypes.FETCH_EVENTS_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EVENTSActions =
  | FetchEVENTSRequest
  | FetchEVENTSSuccess
  | FetchEVENTSFailure;

export interface EVENTSState {
  
  pending: boolean;
  error: string | null;
  response: any;
}

// Employer

export interface FetchEmployerRequest {
  type: typeof employerTypes.FETCH_EMPLOYER_REQUEST;
  payload: any;
}

export type FetchEmployerSuccess = {
  type: typeof employerTypes.FETCH_EMPLOYER_SUCCESS;
  payload: any;
};

export type FetchEmployerFailure = {
  type: typeof employerTypes.FETCH_EMPLOYER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmployerActions =
  | FetchEmployerRequest
  | FetchEmployerSuccess
  | FetchEmployerFailure;

export interface EmployerState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  response:any;
}

//  reLogin

export interface reLoginState {
  pending: boolean;
  error: string | null;
}

export interface reLogin {
  email: string;
  eventTypeId: number;
  isCaptchaVerified: number;
  evntDate:string
  eventSubTypeId:number
}

export interface reAuthResponse {
  isSuccess:boolean;
  errorMessages:[];
}

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchreLoginRequest {
  type: typeof reLoginTypes.FETCH_RELOGIN_REQUEST;
  payload: reLogin;
}

export type FetchreLoginSuccess = {
  type: typeof reLoginTypes.FETCH_RELOGIN_SUCCESS;
  payload: reAuthResponse;
};

export type FetchreLoginFailure = {
  type: typeof reLoginTypes.FETCH_RELOGIN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type reLoginActions =
  | FetchreLoginRequest
  | FetchreLoginSuccess
  | FetchreLoginFailure;

// step2
export interface IStep2Form{
  comments:string,
  commenterName:string,
  //annualFsa:string,
  dependentFsa: string,
  medPlanId:string,
  dentPlanId:string,
  medCoverageTier:string,
  dentCoverageTier:string,
  visionCoverageTier:string,
  visionPlanId:string,
  optMedFsa:string,
  optMedHsa:string,
  confirmationNumber:any,
  eventId:number,
  dependentSet:any[];
}

export interface FetchSTEP2Request {
  type: typeof step2Types.FETCH_STEP2_REQUEST;
  payload: any;
}

export type FetchSTEP2Success = {
  type: typeof step2Types.FETCH_STEP2_SUCCESS;
  payload: any;
};

export type FetchSTEP2Failure = {
  type: typeof step2Types.FETCH_STEP2_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type STEP2Actions =
  | FetchSTEP2Request
  | FetchSTEP2Success
  | FetchSTEP2Failure;

export interface STEP2State {
  pending: boolean;
  error: string | null;
  data: any;
}

//step2 Cancel
export interface IStep2CancelForm{
  eventId:number,
  cancelMedical: boolean,
  cancelHealthAnnualFsa: string,
  cancelCoverHealthAnnualHsa: string,
  cancelEmployeeHsa: string,
  cancelDental: boolean,
  cancelVision : boolean,
  cancelDependentFsa: boolean,
  cancelDependentAnnualFsa: string,
  cancelEmployee: boolean,
  cancelSpouse: boolean,
  cancelDomesticPartner: boolean,
  employee: string,
  spouse: string,
  domesticPartner: string,
  cancelChild: boolean,
  child:string[],
  cancelSpouseChild: boolean,
  cancelDomesticPartnerChild: boolean
  domesticPartnersChild: string[],
  comments:string,
  commenterName: string,
}

export interface FetchSTEP2CancelRequest {
  type: typeof step2CancelTypes.FETCH_STEP2CANCEL_REQUEST;
  payload: any;
}

export type FetchSTEP2CancelSuccess = {
  type: typeof step2CancelTypes.FETCH_STEP2CANCEL_SUCCESS;
  payload: any;
};

export type FetchSTEP2CancelFailure = {
  type: typeof step2CancelTypes.FETCH_STEP2CANCEL_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type STEP2CancelActions =
  | FetchSTEP2CancelRequest
  | FetchSTEP2CancelSuccess
  | FetchSTEP2CancelFailure;

export interface STEP2CancelState {
  pending: boolean;
  error: string | null;
  isSuccess: boolean;
}

// plans
export interface FetchPlanRequest {
  type: typeof planTypes.FETCH_PLAN_REQUEST;
  payload: any;
}

export type FetchPlanSuccess = {
  type: typeof planTypes.FETCH_PLAN_SUCCESS;
  payload: any;
};

export type FetchPlanFailure = {
  type: typeof planTypes.FETCH_PLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type PlanActions =
  | FetchPlanRequest
  | FetchPlanSuccess
  | FetchPlanFailure;

export interface PlanState {
  pending: boolean;
  error: string | null;
  response: any;
}

// step3
export interface Istep3Form{
  fileName:string,
  Name:string,
  Name1:any;
  // cnfNumber:any,
  eventId:number,
  formData:any;
}
export interface FetchSTEP3Request {
  type: typeof step3Types.FETCH_STEP3_REQUEST;
  payload: any;
}

export type FetchSTEP3Success = {
  type: typeof step3Types.FETCH_STEP3_SUCCESS;
  payload: FetchSTEP3SuccessPayload;
};

export type FetchSTEP3SuccessPayload ={
  uploadedFileList: [];
}

export type FetchSTEP3Failure = {
  type: typeof step3Types.FETCH_STEP3_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type STEP3Actions =
  | FetchSTEP3Request
  | FetchSTEP3Success
  | FetchSTEP3Failure;

export interface STEP3State {
  pending: boolean;
  error: string | null;
  data: any;
  response: any;
  fileName:string,
  file:string,
  eventId:number,
  uploadedFileList:any;
}

// getstep3 eventId
export interface GetStep3State {
  pending: boolean;
  error: string | null;
  eventId: number;
  fileName:string;
  Name:any;
  Name1:any;
  formData:any;
 
}

export interface FetchGetStep3Request {
  type: typeof getStep3Types.FETCH_GETSTEP3_REQUEST;
  payload: any;
}

export interface FetchGetStep3SuccessPayload {
  fileName:string,
  file:string,
  // cnfNumber:any,
  eventId:number,
}

export type FetchGetStep3Success = {
  type: typeof getStep3Types.FETCH_GETSTEP3_SUCCESS;
  payload: FetchGetStep3SuccessPayload;
};

export type FetchGetStep3Failure = {
  type: typeof getStep3Types.FETCH_GETSTEP3_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetStep3Actions =
  | FetchGetStep3Request
  | FetchGetStep3Success
  | FetchGetStep3Failure;

export interface GetStep3Response {
  data: {};
}
// edit step3
export interface EditStep3State {
  pending: boolean;
  error: string | null;
  eventId: number;
  fileName:string;
  file:any;
 }

export interface EditStep3 {
  eventId: number;
  fileName:string;
  file:any;
}

export interface FetchEditStep3Request {
  type: typeof editStep3Types.FETCH_EDITSTEP3_REQUEST;
  payload: EditStep3;
}

export type FetchEditStep3Success = {
  type: typeof editStep3Types.FETCH_EDITSTEP3_SUCCESS;
  payload: FetchEditStep3SuccessPayload;
};

export interface FetchEditStep3SuccessPayload {
  uploadedFileList: [];
}

export type FetchEditStep3Failure = {
  type: typeof editStep3Types.FETCH_EDITSTEP3_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditStep3Actions =
  | FetchEditStep3Request
  | FetchEditStep3Success
  | FetchEditStep3Failure;

  // step3 viewFiles

  export interface viewFileState {
    pending: boolean;
    error: string | null;
    eventId: number;
    fileName:string;
    Name:any;
   
  }
  
  export interface FetchviewFileRequest {
    type: typeof viewFileTypes.FETCH_VIEWFILE_REQUEST;
    payload: any;
  }
  
  export interface FetchviewFileSuccessPayload {
    fileName:string,
    file:string,
    // cnfNumber:any,
    eventId:number,
  }
  
  export type FetchviewFileSuccess = {
    type: typeof viewFileTypes.FETCH_VIEWFILE_SUCCESS;
    payload: FetchGetStep3SuccessPayload;
  };
  
  export type FetchviewFileFailure = {
    type: typeof viewFileTypes.FETCH_VIEWFILE_FAILURE;
    payload: FetchPostsFailurePayload;
  };
  
  export type viewFileActions =
    | FetchviewFileRequest
    | FetchviewFileSuccess
    | FetchviewFileFailure;
  
  export interface viewFileResponse {
    data: {};
  }
// privacy policy
  export interface FetchPRIVACYPOLICYRequest {
    type: typeof PrivacypolicyTypes.FETCH_PRIVACYPOLICY_REQUEST;
    payload: any;
  }
  
  export type FetchPrivacypolicySuccess = {
    type: typeof PrivacypolicyTypes.FETCH_PRIVACYPOLICY_SUCCESS;
    payload: any;
  };
  
  export type FetchPrivacypolicyFailure = {
    type: typeof PrivacypolicyTypes.FETCH_PRIVACYPOLICY_FAILURE;
    payload: FetchPostsFailurePayload;
  };
  
  export type PRIVACYPOLICYActions =
    | FetchPRIVACYPOLICYRequest
    | FetchPrivacypolicySuccess
    | FetchPrivacypolicyFailure;
  
  export interface PRIVACYPOLICYState {
    pending: boolean;
    error: string | null;
    privacyPolicy: string;
  }
// URL slug
export interface FetchSlugRequest {
  type: typeof slugTypes.FETCH_SLUG_REQUEST;
  payload: any;
}

export type FetchSlugSuccess = {
  type: typeof slugTypes.FETCH_SLUG_SUCCESS;
  payload: any;
};

export type FetchSlugFailure = {
  type: typeof slugTypes.FETCH_SLUG_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type SlugActions =
  | FetchSlugRequest
  | FetchSlugSuccess
  | FetchSlugFailure;

export interface SlugState {
  pending: boolean;
  error: string | null;
  name: string;
  response:any;
}