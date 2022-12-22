import { fetchEmployerFailure } from "../actions/employerActions";
import {
  loginTypes,
  otpTypes,
  homeTypes,
  faqTypes,
  employerTypes,
  statesTypes,
  addACATypes,
  privacyTypes,
  resendOTPTypes,
  slugTypes
} from "../constants/actionTypes";

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

export type OTPActions = FetchOTPRequest | FetchOTPSuccess | FetchOTPFailure;

export interface OTPState {
  pending: boolean;
  error: string | null;
  email: string;
  phoneNo: string;
  otp:string;
  // contactCertificationBox: string;
  // qleCertificationBox: string;
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
  homePageDescription: string;
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

export type FAQActions = FetchFAQRequest | FetchFAQSuccess | FetchFAQFailure;

export interface FAQState {
  pending: boolean;
  error: string | null;
  data: any;
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
  response: any;
}

//states

export interface FetchSTATESRequest {
  type: typeof statesTypes.FETCH_STATES_REQUEST;
  payload: any;
}

export type FetchSTATESSuccess = {
  type: typeof statesTypes.FETCH_STATES_SUCCESS;
  payload: any;
};

export type FetchSTATESFailure = {
  type: typeof statesTypes.FETCH_STATES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type STATESActions =
  | FetchSTATESRequest
  | FetchSTATESSuccess
  | FetchSTATESFailure;

export interface STATESState {
  pending: boolean;
  error: string | null;
  response: any;
  
}

//addACA
export interface AddACAState {
  pending: boolean;
  error: string | null;
  response: any;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  stateId: string;
  zip: string;
  email: string;
  phoneNo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  empOpenEnrollmentState: string;
  otp:string;
  data:{};
}

export interface FetchAddACARequest {
  type: typeof addACATypes.FETCH_ACA_REQUEST;
  payload: any;
}

export type FetchAddACASuccess = {
  type: typeof addACATypes.FETCH_ACA_SUCCESS;
  payload: FetchAddACASuccessPayload;
};

export interface FetchAddACASuccessPayload {
  confirmationNumber: string;
  
}

export type FetchAddACAFailure = {
  type: typeof addACATypes.FETCH_ACA_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddACAActions =
  | FetchAddACARequest
  | FetchAddACASuccess
  | FetchAddACAFailure;

 // privacyPolicy
 export interface PRIVACYState {
   pending: boolean;
   error: string | null;
   privacyPolicies: string;
 }

 export interface FetchPRIVACYRequest {
   type: typeof privacyTypes.FETCH_PRIVACY_REQUEST;
   payload: any;
 }

 export type FetchPRIVACYSuccess = {
   type: typeof privacyTypes.FETCH_PRIVACY_SUCCESS;
   payload: any;
 }

 export type FetchPRIVACYFailure = {
   type: typeof privacyTypes.FETCH_PRIVACY_FAILURE;
   payload: FetchPostsFailurePayload;
 }

 export type PRIVACYActions = 
   | FetchPRIVACYRequest
   | FetchPRIVACYSuccess
   | FetchPRIVACYFailure;
 
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