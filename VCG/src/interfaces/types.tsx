import {
  loginTypes,
  forgotPwdTypes,
  addRoleTypes,
  allRolesTypes,
  delRoleTypes,
  getRoleTypes,
  allPrivilegesTypes,
  UserTypes,
  editRoleTypes,
  editUserTypes,
  getUserTypes,
  allRolesetTypes,
  addUserTypes,
  delUserTypes,
  delEmployerTypes,
  allEmployersTypes,
  editEmployerTypes,
  getEmployerTypes,
  addEmployerTypes,
  statesTypes,
  empDetailsForCreateTypes,
  updateEmpQLEStepsTypes,
  updateEmpQLEStepsEventTypes,
  dashboardTypes,
  allqlesTypes,
  getQLEEmailTemplateTypes,
  getQLEMessageTemplateTypes,
  getACAEmailTemplateTypes,
  getACAMessageTemplateTypes,
  editACAEmailTemplateTypes,
  editACAMessageTemplateTypes,
  editQLEEmailTemplateTypes,
  editQLEMessageTemplateTypes,
  allACAEmailTemplateTypes,
  allQLEEmailTemplateTypes,
  allACATypes,
  getACAEventTypes,
  editACAInfoTypes,
  delACAEventTypes,
  employerACATypes,
  editInfoTypes,
  getEditByIdTypes,
  notesTypes,
  sentStatusMailTypes,
  filesTypes,
  communicationTypes,
  filesViewTypes,
  filesDeleteTypes,
  delQleEventTypes,
  addEmailTypes,
  addNoteTypes,
  getUserProfileTypes,
  editUserProfileTypes,
  changeUserProfilePasswordTypes,
  empHealthPlanTypes,
  empNewYearPlanTypes,
  healthPlanTypes,
  newYearPlanTypes,
  editHealthPlanTypes,
  eligibilityTypes,
  employerACAEditTypes,
  getACAPreviewTypes,
  getACADownloadTypes,
  getACAEmailTypes,
  allActiveEmployersTypes,
  getHolidayListTypes,
  uploadHolidayListTypes,
  downloadHolidayTemp,
  uploadImageTypes,
  getUploadImageTypes,
  logOutTypes,
  ActiveUserTypes,
  eventStatusTypes,
  empEligibilityTypes
} from "../constants/actionTypes";
//import { IPrivileges } from "./roleType";

export interface AuthResponse {
  token: string;
}

export interface FetchPostsFailurePayload {
  error: string;
  message: string;
}

// Login
export interface LoginState {
  pending: boolean;
  error: string | null;
  accessToken: string;
  message: string;
}

export interface Login {
  username: string;
  password: string;
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

// Forgot Pwd

export interface ForgotPwdResponse {
  token: string;
}

export interface ForgotPwdState {
  pending: boolean;
  error: string | null;
  data: string;
}

export interface ForgotPwd {
  data: string;
}

export interface FetchForgotPwdRequest {
  type: typeof forgotPwdTypes.FETCH_FORGOTPWD_REQUEST;
  payload: ForgotPwd;
}

export type FetchForgotPwdSuccess = {
  type: typeof forgotPwdTypes.FETCH_FORGOTPWD_SUCCESS;
  payload: ForgotPwdResponse;
};

export type FetchForgotPwdFailure = {
  type: typeof forgotPwdTypes.FETCH_FORGOTPWD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type ForgotPwdActions =
  | FetchForgotPwdRequest
  | FetchForgotPwdSuccess
  | FetchForgotPwdFailure;

// AddRole
export interface AddRoleState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
  data: {};
}

export interface AddRole {
  // id:number;
  name: string;
  description: string;
  privilegeSet: string[];
}

export interface FetchAddRoleRequest {
  type: typeof addRoleTypes.FETCH_ADDROLE_REQUEST;
  payload: AddRole;
}

export type FetchAddRoleSuccess = {
  type: typeof addRoleTypes.FETCH_ADDROLE_SUCCESS;
  payload: FetchAddRoleSuccessPayload;
};

export interface FetchAddRoleSuccessPayload {
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
}

export type FetchAddRoleFailure = {
  type: typeof addRoleTypes.FETCH_ADDROLE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddRoleActions =
  | FetchAddRoleRequest
  | FetchAddRoleSuccess
  | FetchAddRoleFailure;

// Edit Role
export interface EditRoleState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
  data: {};
}

export interface EditRole {
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
}

export interface FetchEditRoleRequest {
  type: typeof editRoleTypes.FETCH_EDITROLE_REQUEST;
  payload: EditRole;
}

export type FetchEditRoleSuccess = {
  type: typeof editRoleTypes.FETCH_EDITROLE_SUCCESS;
  payload: FetchEditRoleSuccessPayload;
};

export interface FetchEditRoleSuccessPayload {
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
}

export type FetchEditRoleFailure = {
  type: typeof editRoleTypes.FETCH_EDITROLE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditRoleActions =
  | FetchEditRoleRequest
  | FetchEditRoleSuccess
  | FetchEditRoleFailure;

// All Roles
export interface AllRolesState {
  pending: boolean;
  error: string | null;
  roles: IRoles[];
  data: IRoles[];
}

export interface IRoles {
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
}

// export interface AllRoles {s
//   name: string;
//   description: string;
//   privilegeSet: string[];
// }

export interface FetchAllRolesRequest {
  type: typeof allRolesTypes.FETCH_ALLROLES_REQUEST;
  payload: any;
}

export type FetchAllRolesSuccess = {
  type: typeof allRolesTypes.FETCH_ALLROLES_SUCCESS;
  payload: FetchAllRolesSuccessPayload;
};

export interface FetchAllRolesSuccessPayload {
  roles: IRoles[];
}

export type FetchAllRolesFailure = {
  type: typeof allRolesTypes.FETCH_ALLROLES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllRolesActions =
  | FetchAllRolesRequest
  | FetchAllRolesSuccess
  | FetchAllRolesFailure;

//Delete Role

export interface DelRoleState {
  pending: boolean;
  error: string | null;
  data: any;
}

export interface FetchDelRoleRequest {
  type: typeof delRoleTypes.FETCH_DELROLE_REQUEST;
  payload: any;
}

export type FetchDelRoleSuccess = {
  type: typeof delRoleTypes.FETCH_DELROLE_SUCCESS;
  payload: any;
};

export type FetchDelRoleFailure = {
  type: typeof delRoleTypes.FETCH_DELROLE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelRoleActions =
  | FetchDelRoleRequest
  | FetchDelRoleSuccess
  | FetchDelRoleFailure;

export interface DelResponse {
  data: string;
}

//Get Role By Id

export interface GetRoleState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  description: string;
  privilegeSet: [];
  data: {};
}

export interface FetchGetRoleRequest {
  type: typeof getRoleTypes.FETCH_GETROLE_REQUEST;
  payload: any;
}

export interface FetchGetRoleSuccessPayload {
  id: number;
  name: string;
  description: string;
  privilegeSet: string[];
}

export type FetchGetRoleSuccess = {
  type: typeof getRoleTypes.FETCH_GETROLE_SUCCESS;
  payload: FetchGetRoleSuccessPayload;
};

export type FetchGetRoleFailure = {
  type: typeof getRoleTypes.FETCH_GETROLE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetRoleActions =
  | FetchGetRoleRequest
  | FetchGetRoleSuccess
  | FetchGetRoleFailure;

export interface GetRoleResponse {
  data: {};
}

// All Privileges
export interface AllPrivilegesState {
  pending: boolean;
  error: string | null;
  privileges: IPrivileges[];
  data: IPrivileges[];
}

export interface IPrivileges {
  id: number;
  name: string;
  description: string;
}

export interface FetchAllPrivilegesRequest {
  type: typeof allPrivilegesTypes.FETCH_ALLPRIVILEGES_REQUEST;
  payload: any;
}

export type FetchAllPrivilegesSuccess = {
  type: typeof allPrivilegesTypes.FETCH_ALLPRIVILEGES_SUCCESS;
  payload: FetchAllPrivilegesSuccessPayload;
};

export interface FetchAllPrivilegesSuccessPayload {
  privileges: IPrivileges[];
}

export type FetchAllPrivilegesFailure = {
  type: typeof allPrivilegesTypes.FETCH_ALLPRIVILEGES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllPrivilegesActions =
  | FetchAllPrivilegesRequest
  | FetchAllPrivilegesSuccess
  | FetchAllPrivilegesFailure;

export interface UserState {
  pending: boolean;
  error: string | null;
  data: IUser[];
  roleSet: IUser[];
}
export interface IUser {
  id: number;
  name: string;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  status: string;
  roleSet: string[];
  data: {};
}
export interface FetchUserRequest {
  type: typeof UserTypes.FETCH_USER_REQUEST;
  payload: any;
}
export type FetchUserSuccess = {
  type: typeof UserTypes.FETCH_USER_SUCCESS;
  payload: FetchUserSuccessPayload;
};

export interface FetchUserSuccessPayload {
  users: IUser[];
}

export type FetchUserFailure = {
  type: typeof UserTypes.FETCH_USER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type UserActions =
  | FetchUserRequest
  | FetchUserSuccess
  | FetchUserFailure;

//add user
export interface AddUserState {
  pending: boolean;
  error: string | null;
  id: number;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  status: string;
  roleSet: string[];
  data: {};
}

export interface AddUser {
  // id:number;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  status: string;
  roleSet: any[];
}

export interface FetchAddUserRequest {
  type: typeof addUserTypes.FETCH_ADDUSER_REQUEST;
  payload: AddUser;
}

export type FetchAddUserSuccess = {
  type: typeof addUserTypes.FETCH_ADDUSER_SUCCESS;
  payload: FetchAddUserSuccessPayload;
};

export interface FetchAddUserSuccessPayload {
  id: number;
  name: string;
  email: string;
  roleSet: string[];
}

export type FetchAddUserFailure = {
  type: typeof addUserTypes.FETCH_ADDUSER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddUserActions =
  | FetchAddUserRequest
  | FetchAddUserSuccess
  | FetchAddUserFailure;

//edit user
export interface EditUserState {
  pending: boolean;
  error: string | null;
  id: number;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  status: string;
  roleSet: string[];
  data: {};
}

export interface EditUser {
  id: number;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  status: string;
  roleSet: any[];
}

export interface FetchEditUserRequest {
  type: typeof editUserTypes.FETCH_EDITUSER_REQUEST;
  payload: EditUser;
}

export type FetchEditUserSuccess = {
  type: typeof editUserTypes.FETCH_EDITUSER_SUCCESS;
  payload: FetchEditUserSuccessPayload;
};

export interface FetchEditUserSuccessPayload {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  roleSet: string[];
}

export type FetchEditUserFailure = {
  type: typeof editUserTypes.FETCH_EDITUSER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditUserActions =
  | FetchEditUserRequest
  | FetchEditUserSuccess
  | FetchEditUserFailure;
//get user
export interface GetUserState {
  pending: boolean;
  error: string | null;
  id: any;
  username: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  roleSet: [];
  data: {};
}

export interface FetchGetUserRequest {
  type: typeof getUserTypes.FETCH_GETUSER_REQUEST;
  payload: any;
}

export interface FetchGetUserSuccessPayload {
  id: number;
  name: string;
  email: string;
  roleSet: string[];
}

export type FetchGetUserSuccess = {
  type: typeof getUserTypes.FETCH_GETUSER_SUCCESS;
  payload: FetchGetUserSuccessPayload;
};

export type FetchGetUserFailure = {
  type: typeof getUserTypes.FETCH_GETUSER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetUserActions =
  | FetchGetUserRequest
  | FetchGetUserSuccess
  | FetchGetUserFailure;

export interface GetUserResponse {
  data: {};
}

//roleset

export interface AllRolesetState {
  pending: boolean;
  error: string | null;
  roleSet: Irole[];
  data: Irole[];
}

export interface Irole {
  id: number;
  name: string;
  description: string;
  privillegeSet: Irole[];
}

export interface FetchAllRolesetRequest {
  type: typeof allRolesetTypes.FETCH_ALLROLESET_REQUEST;
  payload: any;
}

export type FetchAllRolesetSuccess = {
  type: typeof allRolesetTypes.FETCH_ALLROLESET_SUCCESS;
  payload: FetchAllRolesetSuccessPayload;
};

export interface FetchAllRolesetSuccessPayload {
  roleSet: Irole[];
}

export type FetchAllRolesetFailure = {
  type: typeof allRolesetTypes.FETCH_ALLROLESET_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllRolesetActions =
  | FetchAllRolesetRequest
  | FetchAllRolesetSuccess
  | FetchAllRolesetFailure;

//delete user

export interface DelUserState {
  pending: boolean;
  error: string | null;
  data: any;
}

export interface FetchDelUserRequest {
  type: typeof delUserTypes.FETCH_DELUSER_REQUEST;
  payload: any;
}

export type FetchDelUserSuccess = {
  type: typeof delUserTypes.FETCH_DELUSER_SUCCESS;
  payload: any;
};

export type FetchDelUserFailure = {
  type: typeof delUserTypes.FETCH_DELUSER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelUserActions =
  | FetchDelUserRequest
  | FetchDelUserSuccess
  | FetchDelUserFailure;

export interface DelResponse {
  data: string;
}

//allEmployers
export interface AllEmployersState {
  pending: boolean;
  error: string | null;
  employer: IEmployers[];
  data: IEmployers[];
}

export interface IEmployers {
  status: string;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  qleEventTypes: [];
  qlePlan: [];
}

export interface FetchAllEmployersRequest {
  type: typeof allEmployersTypes.FETCH_ALLEMPLOYERS_REQUEST;
  payload: any;
}

export type FetchAllEmployersSuccess = {
  type: typeof allEmployersTypes.FETCH_ALLEMPLOYERS_SUCCESS;
  payload: FetchAllEmployersSuccessPayload;
};

export interface FetchAllEmployersSuccessPayload {
  employer: IEmployers[];
}

export type FetchAllEmployersFailure = {
  type: typeof allEmployersTypes.FETCH_ALLEMPLOYERS_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllEmployersActions =
  | FetchAllEmployersRequest
  | FetchAllEmployersSuccess
  | FetchAllEmployersFailure;

//edit employers
export interface EditEmployerState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  status: string;
  qleEnabled: boolean;
  acaEnabled: boolean;
  qleEventTypes: [];
  qlePlan: [];
  data: {};
}

export interface EditEmployer {
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: any;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  status: string;
  qleEnabled: boolean;
  acaEnabled: boolean;
  qleEventTypes: [];
  qlePlan: [];
}

export interface FetchEditEmployerRequest {
  type: typeof editEmployerTypes.FETCH_EDITEMPLOYER_REQUEST;
  payload: EditEmployer;
}

export type FetchEditEmployerSuccess = {
  type: typeof editEmployerTypes.FETCH_EDITEMPLOYER_SUCCESS;
  payload: FetchEditEmployerSuccessPayload;
};

export interface FetchEditEmployerSuccessPayload {
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipcode: any;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  status: string;
  qleEnabled: boolean;
  acaEnabled: boolean;
  qleEventTypes: [];
  qlePlan: [];
}

export type FetchEditEmployerFailure = {
  type: typeof editEmployerTypes.FETCH_EDITEMPLOYER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditEmployerActions =
  | FetchEditEmployerRequest
  | FetchEditEmployerSuccess
  | FetchEditEmployerFailure;

// get Employer
export interface GetEmployerState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: any;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  qleEventTypes: [];
  qlePlan: [];
  qleEnabled: boolean;
  acaEnabled: boolean;
  status: string;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverEmployee: boolean;
}

export interface FetchGetEmployerRequest {
  type: typeof getEmployerTypes.FETCH_GETEMPLOYER_REQUEST;
  payload: any;
}

export interface FetchGetEmployerSuccessPayload {
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipcode: any;
  phoneNo: string;
  phoneType: string;
  qleHomePageDescription: string;
  qleEventTypes: string[];
  qlePlan: string[];
  qleEnabled: boolean;
  acaEnabled: boolean;
  status: string;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverEmployee: boolean;
}

export type FetchGetEmployerSuccess = {
  type: typeof getEmployerTypes.FETCH_GETEMPLOYER_SUCCESS;
  payload: FetchGetEmployerSuccessPayload;
};

export type FetchGetEmployerFailure = {
  type: typeof getEmployerTypes.FETCH_GETEMPLOYER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetEmployerActions =
  | FetchGetEmployerRequest
  | FetchGetEmployerSuccess
  | FetchGetEmployerFailure;

export interface GetEmployerResponse {
  data: {};
}

//delete employer
export interface DelEmployerState {
  pending: boolean;
  error: string | null;
  data: any;
}

export interface FetchDelEmployerRequest {
  type: typeof delEmployerTypes.FETCH_DELEMPLOYER_REQUEST;
  payload: any;
}

export type FetchDelEmployerSuccess = {
  type: typeof delEmployerTypes.FETCH_DELEMPLOYER_SUCCESS;
  payload: any;
};

export type FetchDelEmployerFailure = {
  type: typeof delEmployerTypes.FETCH_DELEMPLOYER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelEmployerActions =
  | FetchDelEmployerRequest
  | FetchDelEmployerSuccess
  | FetchDelEmployerFailure;

export interface DelResponse {
  data: string;
}

//addemployer
export interface AddEmployerState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: any;
  phoneNo: string;
  phoneType: string;
  status: string;
  qleHomePageDescription: string;
  data: {};
}

export interface AddEmployer {
  // id:number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: any;
  phoneNo: string;
  phoneType: string;
  status: string;
  qleHomePageDescription: string;
}

export interface FetchAddEmployerRequest {
  type: typeof addEmployerTypes.FETCH_ADDEMPLOYER_REQUEST;
  payload: AddEmployer;
}

export type FetchAddEmployerSuccess = {
  type: typeof addEmployerTypes.FETCH_ADDEMPLOYER_SUCCESS;
  payload: FetchAddEmployerSuccessPayload;
};

export interface FetchAddEmployerSuccessPayload {
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: any;
  phoneNo: string;
  phoneType: string;
  status: string;
  qleHomePageDescription: string;
}

export type FetchAddEmployerFailure = {
  type: typeof addEmployerTypes.FETCH_ADDEMPLOYER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddEmployerActions =
  | FetchAddEmployerRequest
  | FetchAddEmployerSuccess
  | FetchAddEmployerFailure;

// events

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

/////////////Employer_QLE_Steps

// Employer Create QLE FETCH
// EmpDetails For Create
export interface EmpDetailsForCreateState {
  pending: boolean;
  error: string | null;
  id: number;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
}

export interface IEventType {
  id: number;
  name: string;
  status: string;
  qleEventSubtypes: IEventSubType[];
  qleEventTypeBenifits: IEventTypeBenifit[];
  qleEventTypeRequiredDocuments: IEventTypeRequiredDocument[];
}

export interface IEventSubType {
  name: string;
  status: string;
}

export interface IEventTypeBenifit {
  name: string;
}

export interface IEventTypeRequiredDocument {
  name: string;
}

export interface IQLEPlan {
  name: string;
  planType: string;
  status: string;
}

export interface FetchEmpDetailsForCreateRequest {
  type: typeof empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_REQUEST;
  payload: any;
}

export type FetchEmpDetailsForCreateSuccess = {
  type: typeof empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_SUCCESS;
  payload: FetchEmpDetailsForCreateSuccessPayload;
};

export interface FetchEmpDetailsForCreateSuccessPayload {
  id: number;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
}

export type FetchEmpDetailsForCreateFailure = {
  type: typeof empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmpDetailsForCreateActions =
  | FetchEmpDetailsForCreateRequest
  | FetchEmpDetailsForCreateSuccess
  | FetchEmpDetailsForCreateFailure;

//Update Employer QLE STEPS
export interface UpdateEmpQLEStepsState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNo: string;
  phoneType: string;
  status: string;
  qleHomePageDescription: string;
  qleContactCertDescriptionStep1: string;
  qleCertDescriptionStep1: string;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  qleDisclaimerStep1: string;
  qleWhatBenefitChangesStep2: string;
  qleWhoChangedBenefitStep2: string;
  qleDisclaimerStep2: string;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  acaHomepageDescription: string;
  acaPrimaryContactName: string;
  acaPrimaryContactEmail: string;
  acaPrimaryContactPhoneNo: string;
  acaPrimaryContactPhoneType: string;
  acaPrivacyPolicy: string;
}

export interface FetchUpdateEmpQLEStepsRequest {
  type: typeof updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_REQUEST;
  payload: any;
}

export type FetchUpdateEmpQLEStepsSuccess = {
  type: typeof updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_SUCCESS;
  payload: FetchUpdateEmpQLEStepsSuccessPayload;
};

export interface FetchUpdateEmpQLEStepsSuccessPayload {
  id: number;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  acaHomepageDescription: string;
  acaPrimaryContactName: string;
  acaPrimaryContactEmail: string;
  acaPrimaryContactPhoneNo: string;
  acaPrimaryContactPhoneType: string;
  acaPrivacyPolicy: string;
}

export type FetchUpdateEmpQLEStepsFailure = {
  type: typeof updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type UpdateEmpQLEStepsActions =
  | FetchUpdateEmpQLEStepsRequest
  | FetchUpdateEmpQLEStepsSuccess
  | FetchUpdateEmpQLEStepsFailure;

////Update Employer QLE STEPS Event/EventSubTypes
export interface UpdateEmpQLEStepsEventState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  url: string;
  ein: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  phoneNo: string;
  phoneType: string;
  status: string;
  qleHomePageDescription: string;
  qleContactCertDescriptionStep1: string;
  qleCertDescriptionStep1: string;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  qleDisclaimerStep1: string;
  qleWhatBenefitChangesStep2: string;
  qleWhoChangedBenefitStep2: string;
  qleDisclaimerStep2: string;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  acaHomepageDescription: string;
  acaPrimaryContactName: string;
  acaPrimaryContactEmail: string;
  acaPrimaryContactPhoneNo: string;
  acaPrimaryContactPhoneType: string;
  acaPrivacyPolicy: string;
}

export interface FetchUpdateEmpQLEStepsEventRequest {
  type: typeof updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_REQUEST;
  payload: any;
}

export type FetchUpdateEmpQLEStepsEventSuccess = {
  type: typeof updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_SUCCESS;
  payload: FetchUpdateEmpQLEStepsEventSuccessPayload;
};

export interface FetchUpdateEmpQLEStepsEventSuccessPayload {
  id: number;
  qleEventTypes: IEventType[];
  qlePlan: IQLEPlan[];
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  acaHomepageDescription: string;
  acaPrimaryContactName: string;
  acaPrimaryContactEmail: string;
  acaPrimaryContactPhoneNo: string;
  acaPrimaryContactPhoneType: string;
  acaPrivacyPolicy: string;
}

export type FetchUpdateEmpQLEStepsEventFailure = {
  type: typeof updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type UpdateEmpQLEStepsEventActions =
  | FetchUpdateEmpQLEStepsEventRequest
  | FetchUpdateEmpQLEStepsEventSuccess
  | FetchUpdateEmpQLEStepsEventFailure;

export interface updateACA {
  id: number;
  acaPrimaryContactName: string;
  acaPrimaryContactEmail: string;
  acaPrimaryContactPhoneNo: string;
  acaPrimaryContactPhoneType: string;
}

//Dashboard
export interface DashboardState {
  pending: boolean;
  error: string | null;
  qleInitiated: number;
  qlePendingReview: number;
  qleAdditionalInfoRequired: number;
  qleApprovedOrPending: number;
  qleChangesCompleted: number;
  qleDenied: number;
  qleDuplicate: number;
  qleArchived: number;
  acaNew: number;
  acaAdditionalInfoRequired: number;
  acaRevisit: number;
  acaCompleted: number;
  acaCancelled: number;
  acaArchived: number;
  // response:{};
  response: any;
  data: any;
}

export interface FetchDashboardRequest {
  type: typeof dashboardTypes.FETCH_DASHBOARD_REQUEST;
  payload: any;
}

export interface FetchDashboardSuccessPayload {
  qleInitiated: number;
  qlePendingReview: number;
  qleAdditionalInfoRequired: number;
  qleApprovedOrPending: number;
  qleChangesCompleted: number;
  qleDenied: number;
  qleDuplicate: number;
  qleArchived: number;
  acaNew: number;
  acaAdditionalInfoRequired: number;
  acaRevisit: number;
  acaCompleted: number;
  acaCancelled: number;
  acaArchived: number;
}

export type FetchDashboardSuccess = {
  type: typeof dashboardTypes.FETCH_DASHBOARD_SUCCESS;
  payload: FetchDashboardSuccessPayload;
};

export type FetchDashboardFailure = {
  type: typeof dashboardTypes.FETCH_DASHBOARD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DashboardActions =
  | FetchDashboardRequest
  | FetchDashboardSuccess
  | FetchDashboardFailure;

//getAll qle email template
export interface AllQLEEmailTemplateState {
  pending: boolean;
  error: string | null;
  mailTemplates: IQLEEmailTemplate[];
  data: any;
}

export interface IEmailTemplate {
  id: number;
  mailTemplates: [];
  messageTemplates: [];
}

export interface IQLEEmailTemplate {
  id: number;
  templateId: string;
  subject: string;
  content: string;
  type: string;
  templateType: string;
  name: string;
}

export interface FetchAllQLEEmailTemplateRequest {
  type: typeof allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_REQUEST;
  payload: any;
}

export type FetchAllQLEEmailTemplateSuccess = {
  type: typeof allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_SUCCESS;
  payload: FetchAllQLEEmailTemplateSuccessPayload;
};

export interface FetchAllQLEEmailTemplateSuccessPayload {
  qleEmailTemplate: IQLEEmailTemplate[];
}

export type FetchAllQLEEmailTemplateFailure = {
  type: typeof allQLEEmailTemplateTypes.FETCH_ALLQLEEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllQLEEmailTemplateActions =
  | FetchAllQLEEmailTemplateRequest
  | FetchAllQLEEmailTemplateSuccess
  | FetchAllQLEEmailTemplateFailure;

//EDIT EMAIL TEMP
export interface EditQLEEmailTemplateState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
  data: {};
}

export interface EditQLEEmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
  templateType: string;
  type: string;
}

export interface FetchEditQLEEmailTemplateRequest {
  type: typeof editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_REQUEST;
  payload: EditQLEEmailTemplate;
}

export type FetchEditQLEEmailTemplateSuccess = {
  type: typeof editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_SUCCESS;
  payload: FetchEditQLEEmailTemplateSuccessPayload;
};

export interface FetchEditQLEEmailTemplateSuccessPayload {
  id: number;
  name: string;
  subject: string;
  content: string;
  templateType: string;
  type: string;
}

export type FetchEditQLEEmailTemplateFailure = {
  type: typeof editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditQLEEmailTemplateActions =
  | FetchEditQLEEmailTemplateRequest
  | FetchEditQLEEmailTemplateSuccess
  | FetchEditQLEEmailTemplateFailure;

// get QLE EmailTemp

export interface GetQLEEmailTemplateState {
  pending: boolean;
  error: string | null;
  name: string;
  templateType: string;
  type: string;
  content: string;
  id: number;
  subject: string;
  // data:{};
}

export interface FetchGetQLEEmailTemplateRequest {
  type: typeof getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_REQUEST;
  payload: any;
}

export interface FetchGetQLEEmailTemplateSuccessPayload {
  id: number;
  templateType: string;
  type: string;
  content: string;
  name: string;
  subject: string;
}

export type FetchGetQLEEmailTemplateSuccess = {
  type: typeof getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_SUCCESS;
  payload: FetchGetQLEEmailTemplateSuccessPayload;
};

export type FetchGetQLEEmailTemplateFailure = {
  type: typeof getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetQLEEmailTemplateActions =
  | FetchGetQLEEmailTemplateRequest
  | FetchGetQLEEmailTemplateSuccess
  | FetchGetQLEEmailTemplateFailure;

export interface GetEmailTemplateResponse {
  data: {};
}

//allAca emailTemplate

export interface AllACAEmailTemplateState {
  pending: boolean;
  error: string | null;
  emailTemplate: IACAEmailTemplate[];
  data: any;
}

export interface IEmailTemplate {
  id: number;
  mailTemplates: [];
  messageTemplates: [];
}

export interface IACAEmailTemplate {
  id: number;
  templateId: string;
  name: string;
  content: string;
  type: string;
  templateType: string;
  subject: string;
}

export interface FetchAllACAEmailTemplateRequest {
  type: typeof allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_REQUEST;
  payload: any;
}

export type FetchAllACAEmailTemplateSuccess = {
  type: typeof allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_SUCCESS;
  payload: FetchAllACAEmailTemplateSuccessPayload;
};

export interface FetchAllACAEmailTemplateSuccessPayload {
  acaEmailTemplate: IACAEmailTemplate[];
}

export type FetchAllACAEmailTemplateFailure = {
  type: typeof allACAEmailTemplateTypes.FETCH_ALLACAEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllACAEmailTemplateActions =
  | FetchAllACAEmailTemplateRequest
  | FetchAllACAEmailTemplateSuccess
  | FetchAllACAEmailTemplateFailure;

// getAca EmailTemp

export interface GetACAEmailTemplateState {
  pending: boolean;
  error: string | null;
  name: string;
  templateType: string;
  type: string;
  content: string;
  id: number;
  subject: string;
  // data:{};
}

export interface FetchGetACAEmailTemplateRequest {
  type: typeof getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_REQUEST;
  payload: any;
}

export interface FetchGetACAEmailTemplateSuccessPayload {
  id: number;
  templateType: string;
  type: string;
  content: string;
  name: string;
  subject: string;
}

export type FetchGetACAEmailTemplateSuccess = {
  type: typeof getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_SUCCESS;
  payload: FetchGetACAEmailTemplateSuccessPayload;
};

export type FetchGetACAEmailTemplateFailure = {
  type: typeof getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACAEmailTemplateActions =
  | FetchGetACAEmailTemplateRequest
  | FetchGetACAEmailTemplateSuccess
  | FetchGetACAEmailTemplateFailure;

export interface GetAcaEmailTemplateResponse {
  data: {};
}

//EDIT ACA EMAIL TEMP

export interface EditACAEmailTemplateState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
  data: {};
}

export interface EditACAEmailTemplate {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export interface FetchEditACAEmailTemplateRequest {
  type: typeof editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_REQUEST;
  payload: EditACAEmailTemplate;
}

export type FetchEditACAEmailTemplateSuccess = {
  type: typeof editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_SUCCESS;
  payload: FetchEditACAEmailTemplateSuccessPayload;
};

export interface FetchEditACAEmailTemplateSuccessPayload {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export type FetchEditACAEmailTemplateFailure = {
  type: typeof editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditACAEmailTemplateActions =
  | FetchEditACAEmailTemplateRequest
  | FetchEditACAEmailTemplateSuccess
  | FetchEditACAEmailTemplateFailure;

// getAca Message Template

export interface GetACAMessageTemplateState {
  pending: boolean;
  error: string | null;
  name: string;
  templateType: string;
  type: string;
  content: string;
  id: number;
  subject: string;
  // data:{};
}

export interface FetchGetACAMessageTemplateRequest {
  type: typeof getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_REQUEST;
  payload: any;
}

export interface FetchGetACAMessageTemplateSuccessPayload {
  id: number;
  templateType: string;
  type: string;
  content: string;
  name: string;
  subject: string;
}

export type FetchGetACAMessageTemplateSuccess = {
  type: typeof getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_SUCCESS;
  payload: FetchGetACAMessageTemplateSuccessPayload;
};

export type FetchGetACAMessageTemplateFailure = {
  type: typeof getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACAMessageTemplateActions =
  | FetchGetACAMessageTemplateRequest
  | FetchGetACAMessageTemplateSuccess
  | FetchGetACAMessageTemplateFailure;

export interface GetAcaMessageTemplateResponse {
  data: {};
}

//EDIT ACA MESSAGE TEMP

export interface EditACAMessageTemplateState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
  data: {};
}

export interface EditACAMessageTemplate {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export interface FetchEditACAMessageTemplateRequest {
  type: typeof editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_REQUEST;
  payload: EditACAMessageTemplate;
}

export type FetchEditACAMessageTemplateSuccess = {
  type: typeof editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_SUCCESS;
  payload: FetchEditACAMessageTemplateSuccessPayload;
};

export interface FetchEditACAMessageTemplateSuccessPayload {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export type FetchEditACAMessageTemplateFailure = {
  type: typeof editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditACAMessageTemplateActions =
  | FetchEditACAMessageTemplateRequest
  | FetchEditACAMessageTemplateSuccess
  | FetchEditACAMessageTemplateFailure;

// get QLE Message Template

export interface GetQLEMessageTemplateState {
  pending: boolean;
  error: string | null;
  name: string;
  templateType: string;
  type: string;
  content: string;
  id: number;
  subject: string;
  // data:{};
}

export interface FetchGetQLEMessageTemplateRequest {
  type: typeof getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_REQUEST;
  payload: any;
}

export interface FetchGetQLEMessageTemplateSuccessPayload {
  id: number;
  templateType: string;
  type: string;
  content: string;
  name: string;
  subject: string;
}

export type FetchGetQLEMessageTemplateSuccess = {
  type: typeof getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_SUCCESS;
  payload: FetchGetQLEMessageTemplateSuccessPayload;
};

export type FetchGetQLEMessageTemplateFailure = {
  type: typeof getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetQLEMessageTemplateActions =
  | FetchGetQLEMessageTemplateRequest
  | FetchGetQLEMessageTemplateSuccess
  | FetchGetQLEMessageTemplateFailure;

export interface GetQLEMessageTemplateResponse {
  data: {};
}

// QLE EDIT MESSAGE TEMP
export interface EditQLEMessageTemplateState {
  pending: boolean;
  error: string | null;
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
  data: {};
}

export interface EditQLEMessageTemplate {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export interface FetchEditQLEMessageTemplateRequest {
  type: typeof editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_REQUEST;
  payload: EditQLEMessageTemplate;
}

export type FetchEditQLEMessageTemplateSuccess = {
  type: typeof editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_SUCCESS;
  payload: FetchEditQLEMessageTemplateSuccessPayload;
};

export interface FetchEditQLEMessageTemplateSuccessPayload {
  id: number;
  name: string;
  content: string;
  templateType: string;
  type: string;
  subject: string;
}

export type FetchEditQLEMessageTemplateFailure = {
  type: typeof editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditQLEMessageTemplateActions =
  | FetchEditQLEMessageTemplateRequest
  | FetchEditQLEMessageTemplateSuccess
  | FetchEditQLEMessageTemplateFailure;
//qles

export interface AllQlesState {
  length: number;
  pending: boolean;
  error: string | null;
  data: any;
}

export interface IQle {
  eventId: 0;
  name: string;
  ssn: string;
  eventTypeId: string;
  eventType: string;
  eventSubTypeId: string;
  eventSubType: string;
  evntDate: string;
  submittedDate: string;
  modifiedDate: string;
  data: any;
}

export interface FetchAllQlesRequest {
  type: typeof allqlesTypes.FETCH_ALLQLES_REQUEST;
  payload: any;
}

export type FetchAllQlesSuccess = {
  type: typeof allqlesTypes.FETCH_ALLQLES_SUCCESS;
  payload: FetchAllQlesSuccessPayload;
};

export interface FetchAllQlesSuccessPayload {
  payload: IQle[];
}

export type FetchAllQlesFailure = {
  type: typeof allqlesTypes.FETCH_ALLQLES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllQlesActions =
  | FetchAllQlesRequest
  | FetchAllQlesSuccess
  | FetchAllQlesFailure;
export interface FetchPostsFailurePayload {
  error: string;
  message: string;
}

//allACA

export interface AllACAState {
  pending: boolean;
  error: string | null;
  data: any;
  aca: IACA[];
}

export interface IACA {
  acaEventId: 0;
  confirmationNumber: string;
  firstName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  zip: string;
  email: string;
  phoneNo: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  status: string;
  employerId: string;
  employerName: string;
  employerIdentificationNumber: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  empOpenEnrollmentState: string;
  dateReceived: string;
}

export interface FetchAllACARequest {
  type: typeof allACATypes.FETCH_ALLACA_REQUEST;
  payload: any;
}

export type FetchAllACASuccess = {
  type: typeof allACATypes.FETCH_ALLACA_SUCCESS;
  payload: FetchAllACASuccessPayload;
};

export interface FetchAllACASuccessPayload {
  aca: IACA[];
}

export type FetchAllACAFailure = {
  type: typeof allACATypes.FETCH_ALLACA_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AllACAActions =
  | FetchAllACARequest
  | FetchAllACASuccess
  | FetchAllACAFailure;

//getACAEvent
export interface GetACAEventState {
  pending: boolean;
  error: string | null;
  acaEventId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  email: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  empOpenEnrollmentState: string;
  stateId: string;
  status: string;
  employerId: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  eventNotes: [];
  communicationRecords: [];
  activityList: [];
  healthPlan: {};
  stateCode: string;
  newYearChangesOneStates: [];
  newYearChangesTwoStates: [];
  whoDoesTheHealthPlanCoverStates: [];
  missOpenEnrollmentStates: [];
  data: any;
  // getEvent: IGetACAEvent[];
}

export interface IGetACAEvent {
  acaEventId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  email: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  empOpenEnrollmentState: string;
  stateId: string;
  status: string;
  employerId: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  eventNotes: [];
  communicationRecords: [];
}

export interface IAddACAForm {
  acaEventId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  email: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  empOpenEnrollmentState: string;
  stateId: string;
  status: string;
  employerId: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  eventNotes: [];
  communicationRecords: [];
}

export interface FetchGetACAEventRequest {
  type: typeof getACAEventTypes.FETCH_GETACAEVENT_REQUEST;
  payload: any;
}

export type FetchGetACAEventSuccess = {
  type: typeof getACAEventTypes.FETCH_GETACAEVENT_SUCCESS;
  payload: FetchGetACAEventSuccessPayload;
};

export interface FetchGetACAEventSuccessPayload {
  acaEventId: 0;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  email: string;
  phoneNo: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  empOpenEnrollmentState: string;
  stateId: string;
  status: string;
  employerId: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  eventNotes: [];
  communicationRecords: [];
  activityList: [];
}

export type FetchGetACAEventFailure = {
  type: typeof getACAEventTypes.FETCH_GETACAEVENT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACAEventActions =
  | FetchGetACAEventRequest
  | FetchGetACAEventSuccess
  | FetchGetACAEventFailure;

export interface GetACAEventResponse {
  data: {};
}

//delete ACA
export interface DelACAEventState {
  pending: boolean;
  error: string | null;
  data: any;
}

export interface FetchDelACAEventRequest {
  type: typeof delACAEventTypes.FETCH_DELACAEVENT_REQUEST;
  payload: any;
}

export type FetchDelACAEventSuccess = {
  type: typeof delACAEventTypes.FETCH_DELACAEVENT_SUCCESS;
  payload: any;
};

export type FetchDelACAEventFailure = {
  type: typeof delACAEventTypes.FETCH_DELACAEVENT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelACAEventActions =
  | FetchDelACAEventRequest
  | FetchDelACAEventSuccess
  | FetchDelACAEventFailure;

export interface DelResponse {
  data: string;
}

// editACAInfo
export interface EditACAInfoState {
  pending: boolean;
  error: string | null;
  acaEventId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  zip: string;
  dependent1: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  empOpenEnrollmentState: string;
  stateId: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  status: string;
  data: {};
}

export interface EditACAInfo {
  acaEventId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  zip: string;
  dependent1: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  empOpenEnrollmentState: string;
  stateId: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  status: string;
}

export interface FetchEditACAInfoRequest {
  type: typeof editACAInfoTypes.FETCH_EDITACAINFO_REQUEST;
  payload: EditACAInfo;
}

export type FetchEditACAInfoSuccess = {
  type: typeof editACAInfoTypes.FETCH_EDITACAINFO_SUCCESS;
  payload: FetchEditACAInfoSuccessPayload;
};

export interface FetchEditACAInfoSuccessPayload {
  acaEventId: number;
  firstName: string;
  lastName: string;
  suffix: string;
  dob: string;
  ssn: string;
  address: string;
  city: string;
  zip: string;
  dependent1: string;
  dependent2: string;
  dependent3: string;
  dependent4: string;
  preferredContactMethod: string;
  healthCoverageInfo: string;
  empOpenEnrollmentState: string;
  stateId: string;
  status: string;
}

export type FetchEditACAInfoFailure = {
  type: typeof editACAInfoTypes.FETCH_EDITACAINFO_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditACAInfoActions =
  | FetchEditACAInfoRequest
  | FetchEditACAInfoSuccess
  | FetchEditACAInfoFailure;

//EMPLOYERACA
export interface EmployerACAState {
  length: number;
  pending: boolean;
  error: string | null;
  employerId: string;
  employerName: string;
  employerIdentificationNumber: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
  data: {};
}

export interface FetchEmployerACARequest {
  type: typeof employerACATypes.FETCH_EMPLOYERACA_REQUEST;
  payload: any;
}

export interface FetchEmployerACASuccessPayload {
  employerId: string;
  employerName: string;
  employerIdentificationNumber: string;
  employerPhoneAndType: string;
  employerPrimaryContact: string;
  employerAddress: string;
}

export type FetchEmployerACASuccess = {
  type: typeof employerACATypes.FETCH_EMPLOYERACA_SUCCESS;
  payload: FetchEmployerACASuccessPayload;
};

export type FetchEmployerACAFailure = {
  type: typeof employerACATypes.FETCH_EMPLOYERACA_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmployerACAActions =
  | FetchEmployerACARequest
  | FetchEmployerACASuccess
  | FetchEmployerACAFailure;

export interface GetEmployerACAResponse {
  data: {};
}

export interface DelResponse {
  data: string;
}

//editinfo
export interface EditinfoState {
  pending: boolean;
  error: string | null;
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  event1: string;
  event2: string;
  email: string;
  number: string;
  dob: string;
  eventStatus: string;
  uniqueLink: string;
  eventTypeId: string;
  eventSubTypeId: string;
  data: {};
}

export interface Editinfo {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  event1: string;
  event2: string;
  email: string;
  number: string;
  dob: string;
  eventStatus: string;
  uniqueLink: string;
}

export interface FetchEditRequest {
  type: typeof editInfoTypes.FETCH_EDIT_REQUEST;
  payload: Editinfo;
}

export type FetchEditSuccess = {
  type: typeof editInfoTypes.FETCH_EDIT_SUCCESS;
  payload: FetchEditSuccessPayload;
};

export interface FetchEditSuccessPayload {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  event1: string;
  event2: string;
  email: string;
  number: string;
  dob: string;
  eventStatus: string;
  uniqueLink: string;
}

export type FetchEditFailure = {
  type: typeof editInfoTypes.FETCH_EDIT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type editinfoActions =
  | FetchEditRequest
  | FetchEditSuccess
  | FetchEditFailure;

//geteditbyid

export interface GetEditByIdState {
  pending: boolean;
  error: string | null;
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  eventid: string;
  eventsubid: string;
  event1: string;
  event2: string;
  email: string;
  number: string;
  dob: string;
  eventStatus: string;
  uniqueLink: string;
  evntDate: string;
  dependentDetails: [];
  benefitDetails: {};
  qleEventActivity: [];
  uploadedDocList: [];
  data: {};
}

export interface FetchGetEditByIdRequest {
  type: typeof getEditByIdTypes.FETCH_GETEDITBYID_REQUEST;
  payload: any;
}

export interface FetchGetEditByIdSuccessPayload {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  SSN: string;
  event1: string;
  event2: string;
  email: string;
  number: string;
  eventid: string;
  eventsubid: string;
  dob: string;
  eventStatus: string;
  uniqueLink: string;
  evntDate: string;
}

export type FetchGetEditByIdSuccess = {
  type: typeof getEditByIdTypes.FETCH_GETEDITBYID_SUCCESS;
  payload: FetchGetEditByIdSuccessPayload;
};

export type FetchGetEditByIdFailure = {
  type: typeof getEditByIdTypes.FETCH_GETEDITBYID_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetEditByIdActions =
  | FetchGetEditByIdRequest
  | FetchGetEditByIdSuccess
  | FetchGetEditByIdFailure;

export interface GetEventsResponse {
  data: {};
}

//NOTES
export interface NotesState {
  pending: boolean;
  error: string | null;
  response: any;
  length: number;
  data: [];
}
export interface FetchNotesRequest {
  type: typeof notesTypes.FETCH_NOTES_REQUEST;
  payload: any;
}

export type FetchNotesSuccess = {
  type: typeof notesTypes.FETCH_NOTES_SUCCESS;
  payload: any;
};

export type FetchNotesFailure = {
  type: typeof notesTypes.FETCH_NOTES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type NotesActions =
  | FetchNotesRequest
  | FetchNotesSuccess
  | FetchNotesFailure;

//sent status mail
export interface SentStatusMailState {
  pending: boolean;
  error: string | null;
  response: any;
  length: number;
  eventId: string;
  eventStatus: string;
  emailSubject: string;
  emailContent: string;
  data: {};
}
export interface FetchSentStatusMailRequest {
  type: typeof sentStatusMailTypes.FETCH_SENTSTATUSMAIL_REQUEST;
  payload: any;
}

export type FetchSentStatusMailSuccess = {
  type: typeof sentStatusMailTypes.FETCH_SENTSTATUSMAIL_SUCCESS;
  payload: any;
};

export type FetchSentStatusMailFailure = {
  type: typeof sentStatusMailTypes.FETCH_SENTSTATUSMAIL_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type SentStatusMailActions =
  | FetchSentStatusMailRequest
  | FetchSentStatusMailSuccess
  | FetchSentStatusMailFailure;

//files
export interface IFilesState {
  formData: any;
}
export interface FetchFilesRequest {
  type: typeof filesTypes.FETCH_FILES_REQUEST;
  payload: any;
}

export type FetchFilesSuccess = {
  type: typeof filesTypes.FETCH_FILES_SUCCESS;
  payload: FetchSTEP3SuccessPayload;
};

export type FetchSTEP3SuccessPayload = {
  uploadedDocList: [];
};
export type FetchFilesFailure = {
  type: typeof filesTypes.FETCH_FILES_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type FilesActions =
  | FetchFilesRequest
  | FetchFilesSuccess
  | FetchFilesFailure;

export interface FilesState {
  pending: boolean;
  error: string | null;
  response: any;
  file: string;
  id: number;
  name: string;
}

//filesview
export interface FilesviewState {
  pending: boolean;
  error: string | null;
  response: any;
  length: number;
  eventId: string;
  fileName: string;
  data: {};
}
export interface FetchFilesViewRequest {
  type: typeof filesViewTypes.FETCH_FILESVIEW_REQUEST;
  payload: any;
}

export type FetchFilesViewSuccess = {
  type: typeof filesViewTypes.FETCH_FILESVIEW_SUCCESS;
  payload: any;
};

export type FetchFilesViewFailure = {
  type: typeof filesViewTypes.FETCH_FILESVIEW_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type FilesViewActions =
  | FetchFilesViewRequest
  | FetchFilesViewSuccess
  | FetchFilesViewFailure;

//files delete
export interface FilesDeleteState {
  pending: boolean;
  error: string | null;
  response: any;
  length: number;
  id: string;
  fileName: string;
  data: {};
}
export interface FetchDeleteFilesRequest {
  type: typeof filesDeleteTypes.FETCH_DELETEFILES_REQUEST;
  payload: any;
}

export type FetchDeleteFilesSuccess = {
  type: typeof filesDeleteTypes.FETCH_DELETEFILES_SUCCESS;
  payload: any;
};

export type FetchDeleteFilesFailure = {
  type: typeof filesDeleteTypes.FETCH_DELETEFILESE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type FilesDeleteActions =
  | FetchDeleteFilesRequest
  | FetchDeleteFilesSuccess
  | FetchDeleteFilesFailure;

// qle event delete
export interface DelQleEventState {
  pending: boolean;
  error: string | null;
  id: string;
  data: any;
}

export interface FetchDelQleEventRequest {
  type: typeof delQleEventTypes.FETCH_DELQLEEVENT_REQUEST;
  payload: any;
}

export type FetchDelQleEventSuccess = {
  type: typeof delQleEventTypes.FETCH_DELQLEEVENT_SUCCESS;
  payload: any;
};

export type FetchDelQleEventFailure = {
  type: typeof delQleEventTypes.FETCH_DELQLEEVENT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelQleEventActions =
  | FetchDelQleEventRequest
  | FetchDelQleEventSuccess
  | FetchDelQleEventFailure;

//communications
export interface CommunicationState {
  pending: boolean;
  error: string | null;
  length: number;
  id: number;
  communications: [];
  data: {};
}

export interface FetchCommunicationRequest {
  type: typeof communicationTypes.FETCH_COMMUNICATION_REQUEST;
  payload: any;
}

export type FetchCommunicationSuccess = {
  type: typeof communicationTypes.FETCH_COMMUNICATION_SUCCESS;
  payload: any;
};

export type FetchCommunicationFailure = {
  type: typeof communicationTypes.FETCH_COMMUNICATION_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type CommunicationActions =
  | FetchCommunicationRequest
  | FetchCommunicationSuccess
  | FetchCommunicationFailure;

//ADD NOTE

export interface AddNoteState {
  pending: boolean;
  error: string | null;
  eventId: number;
  note: string;
  data: {};
}

export interface AddNote {
  note: string;
}

export interface FetchAddNoteRequest {
  type: typeof addNoteTypes.FETCH_ADDNOTE_REQUEST;
  payload: AddNote;
}

export type FetchAddNoteSuccess = {
  type: typeof addNoteTypes.FETCH_ADDNOTE_SUCCESS;
  payload: FetchAddNoteSuccessPayload;
};

export interface FetchAddNoteSuccessPayload {
  isSuccess: [];
}

export type FetchAddNoteFailure = {
  type: typeof addNoteTypes.FETCH_ADDNOTE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddNoteActions =
  | FetchAddNoteRequest
  | FetchAddNoteSuccess
  | FetchAddNoteFailure;

//Add Email PhoneLog

export interface AddEmailState {
  pending: boolean;
  error: string | null;
  communicationString: string;
  communicationThrough: number;
}

export interface AddEmail {
  communicationString: string;
  communicationThrough: number;
}

export interface FetchAddEmailRequest {
  type: typeof addEmailTypes.FETCH_ADDEMAIL_REQUEST;
  payload: AddEmail;
}

export type FetchAddEmailSuccess = {
  type: typeof addEmailTypes.FETCH_ADDEMAIL_SUCCESS;
  payload: FetchAddEmailSuccessPayload;
};

export interface FetchAddEmailSuccessPayload {
  isSuccess: [];
}

export type FetchAddEmailFailure = {
  type: typeof addEmailTypes.FETCH_ADDEMAIL_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddEmailActions =
  | FetchAddEmailRequest
  | FetchAddEmailSuccess
  | FetchAddEmailFailure;

// get user profile

export interface GetUserProfileState {
  pending: boolean;
  error: string | null;
  userProfile: IUserProfile[];
  data: IUserProfile[];
}

export interface IUserProfile {
  firstName: string;
  lastName: string;
  email: string;
  middleName: string;
}

export interface FetchGetUserProfileRequest {
  type: typeof getUserProfileTypes.FETCH_GETUSERPROFILE_REQUEST;
  payload: any;
}

export type FetchGetUserProfileSuccess = {
  type: typeof getUserProfileTypes.FETCH_GETUSERPROFILE_SUCCESS;
  payload: FetchGetUserProfileSuccessPayload;
};

export interface FetchGetUserProfileSuccessPayload {
  userProfile: IUserProfile[];
}

export type FetchGetUserProfileFailure = {
  type: typeof getUserProfileTypes.FETCH_GETUSERPROFILE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetUserProfileActions =
  | FetchGetUserProfileRequest
  | FetchGetUserProfileSuccess
  | FetchGetUserProfileFailure;

// edit User
export interface EditUserProfileState {
  pending: boolean;
  error: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface EditUserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
}

export interface FetchEditUserProfileRequest {
  type: typeof editUserProfileTypes.FETCH_EDITUSERPROFILE_REQUEST;
  payload: EditUserProfile;
}

export type FetchEditUserProfileSuccess = {
  type: typeof editUserProfileTypes.FETCH_EDITUSERPROFILE_SUCCESS;
  payload: FetchEditUserProfileSuccessPayload;
};

export interface FetchEditUserProfileSuccessPayload {
  firstName: string;
  middleName: string;
  lastName: string;
  errorMessages: [];
  isSuccess: boolean;
}

export type FetchEditUserProfileFailure = {
  type: typeof editUserProfileTypes.FETCH_EDITUSERPROFILE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditUserProfileActions =
  | FetchEditUserProfileRequest
  | FetchEditUserProfileSuccess
  | FetchEditUserProfileFailure;

// change userprofile
export interface changeUserProfilePasswordState {
  pending: boolean;
  error: string | null;
  password: string;
  confirmPassword: string;
}

export interface ChangeUserProfilePassword {
  password: string;
  confirmPassword: string;
}

export interface FetchChangeUserProfilePasswordRequest {
  type: typeof changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_REQUEST;
  payload: ChangeUserProfilePassword;
}

export type FetchChangeUserProfilePasswordSuccess = {
  type: typeof changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_SUCCESS;
  payload: FetchChangeUserProfilePasswordSuccessPayload;
};

export interface FetchChangeUserProfilePasswordSuccessPayload {
  errorMessages: [];
  isSuccess: boolean;
}

export type FetchChangeUserProfilePasswordFailure = {
  type: typeof changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type ChangeUserProfilePasswordActions =
  | FetchChangeUserProfilePasswordRequest
  | FetchChangeUserProfilePasswordSuccess
  | FetchChangeUserProfilePasswordFailure;

//ACA health plan
export interface FetchEmpHealthPlanRequest {
  type: typeof empHealthPlanTypes.FETCH_EMPHEALTHPLAN_REQUEST;
  payload: any;
}

export type FetchEmpHealthPlanSuccess = {
  type: typeof empHealthPlanTypes.FETCH_EMPHEALTHPLAN_SUCCESS;
  payload: any;
};

export type FetchEmpHealthPlanFailure = {
  type: typeof empHealthPlanTypes.FETCH_EMPHEALTHPLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmpHealthPlanActions =
  | FetchEmpHealthPlanRequest
  | FetchEmpHealthPlanSuccess
  | FetchEmpHealthPlanFailure;

export interface EmpHealthPlanState {
  pending: boolean;
  error: string | null;
  response: any;
  mec: boolean;
  healtPlanCover:number;
  employerSignature:string;
}

//ACA NewYear changes
export interface FetchEmpNewYearPlanRequest {
  type: typeof empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_REQUEST;
  payload: any;
}

export type FetchEmpNewYearPlanSuccess = {
  type: typeof empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_SUCCESS;
  payload: FetchEmpNewYearPlanSuccessPayload;
};

export interface FetchEmpNewYearPlanSuccessPayload {
  payload: any;
}

export type FetchEmpNewYearPlanFailure = {
  type: typeof empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmpNewYearPlanActions =
  | FetchEmpNewYearPlanRequest
  | FetchEmpNewYearPlanSuccess
  | FetchEmpNewYearPlanFailure;

export interface EmpNewYearPlanState {
  pending: boolean;
  error: string | null;
  newYearChangesOneEmployerOffer: number,
  newYearChangeOneEmployeePay: string,
  newYearChaneOneOften: number,
  newYearChangeOneEffectiveDate:string,

  newYearChangesTwoEmployerOffer: number,
  newYearChangeTwoEmployeePay: string,
  newYearChaneTwoOften: number,
  newYearChangeTwoEffectiveDate:string
  data: any;
}

// Employer ACA Eligibility
export interface EmpEligibilityState {
  type: any;
  payload: any;
  pending: boolean;
  error: string | null;
  response: any;
  employeePremium:number;
  employeePremiumOften:any;
  nextThreeMonths:string;
  data:any;
}

export interface FetchEmpEligibilityRequest {
  type: typeof empEligibilityTypes.FETCH_EMP_ELIGIBILITY_REQUEST;
  payload: any;
}

export type FetchEmpEligibilitySuccess = {
  type: typeof empEligibilityTypes.FETCH_EMP_ELIGIBILITY_SUCCESS;
  payload: FetchEmpEligibilitySuccessPayload;
};

export interface FetchEmpEligibilitySuccessPayload {
  payload: any;
};

export type FetchEmpEligibilityFailure = {
  type: typeof empEligibilityTypes.FETCH_EMP_ELIGIBILITY_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmpEligibilityActions =
  | FetchEmpEligibilityRequest
  | FetchEmpEligibilitySuccess
  | FetchEmpEligibilityFailure;

//healthPlan
export interface HealthPlanState {
  pending: boolean;
  error: string | null;
  mecMcCoverage: boolean;
  dependentEligiblity: number;
}

export interface HealthPlan {
  // healthPlanId: any;
  mecMcCoverage: boolean;
  dependentEligiblity: number;
  id: number;
}

export interface IHealthPlan {
  healthPlanId: number;
  mecMcCoverage: boolean;
  dependentEligiblity: number;
  employerSignature: string;
  id: number;
}

export interface FetchHealthPlanRequest {
  type: typeof healthPlanTypes.FETCH_HEALTHPLAN_REQUEST;
  payload: HealthPlan;
}

export type FetchHealthPlanSuccess = {
  type: typeof healthPlanTypes.FETCH_HEALTHPLAN_SUCCESS;
  payload: FetchHealthPlanSuccessPayload;
};

export interface FetchHealthPlanSuccessPayload {
  isSuccess: [];
}

export type FetchHealthPlanFailure = {
  type: typeof healthPlanTypes.FETCH_HEALTHPLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type HealthPlanActions =
  | FetchHealthPlanRequest
  | FetchHealthPlanSuccess
  | FetchHealthPlanFailure;

//newYearPlan
export interface NewYearPlanState {
  pending: boolean;
  error: string | null;
  plan1EmployerOfferCoverage: number;
  plan1EmployeeHavetoPay: number;
  plan1HowOften: number;
  plan1EffectiveDate: string;
  plan2EmployerOfferCoverage: number;
  plan2EmployeeHavetoPay: number;
  plan2HowOften: number;
  plan2EffectiveDate: string;
}

export interface NewYearPlan {
  plan1EmployerOfferCoverage: number;
  plan1EmployeeHavetoPay: number;
  plan1HowOften: number;
  plan1EffectiveDate: string;
  plan2EmployerOfferCoverage: number;
  plan2EmployeeHavetoPay: number;
  plan2HowOften: number;
  plan2EffectiveDate: string;
  id: number;
}

export interface FetchNewYearPlanRequest {
  type: typeof newYearPlanTypes.FETCH_NEWYEARPLAN_REQUEST;
  payload: NewYearPlan;
}

export type FetchNewYearPlanSuccess = {
  type: typeof newYearPlanTypes.FETCH_NEWYEARPLAN_SUCCESS;
  payload: FetchNewYearPlanSuccessPayload;
};

export interface FetchNewYearPlanSuccessPayload {
  isSuccess: [];
}

export type FetchNewYearPlanFailure = {
  type: typeof newYearPlanTypes.FETCH_NEWYEARPLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type NewYearPlanActions =
  | FetchNewYearPlanRequest
  | FetchNewYearPlanSuccess
  | FetchNewYearPlanFailure;

//EditHealthPlan
export interface EditHealthPlanState {
  pending: boolean;
  error: string | null;
  healthPlanId: number;
  mecMcCoverage: boolean;
  dependentEligiblity: number;
  employerSignature: string;
}

export interface EditHealthPlan {
  healthPlanId: number;
  mecMcCoverage: boolean;
  dependentEligiblity: number;
  employerSignature: string;
  id: number;
}

export interface FetchEditHealthPlanRequest {
  type: typeof editHealthPlanTypes.FETCH_EDITHEALTHPLAN_REQUEST;
  payload: EditHealthPlan;
}

export type FetchEditHealthPlanSuccess = {
  type: typeof editHealthPlanTypes.FETCH_EDITHEALTHPLAN_SUCCESS;
  payload: FetchEditHealthPlanSuccessPayload;
};

export interface FetchEditHealthPlanSuccessPayload {
  isSuccess: [];
}

export type FetchEditHealthPlanFailure = {
  type: typeof editHealthPlanTypes.FETCH_EDITHEALTHPLAN_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditHealthPlanActions =
  | FetchEditHealthPlanRequest
  | FetchEditHealthPlanSuccess
  | FetchEditHealthPlanFailure;

//eligibility
export interface EligibilityState {
  pending: boolean;
  error: string | null;
  employeePremium: string;
  premiumFrequency: number;
  isEmployeeElgbleOrNext3Months: boolean;
  employeeElgbleOrNext3MonthsDate: string;
}

export interface Eligibility {
  employeePremium: string;
  premiumFrequency: number;
  isEmployeeElgbleOrNext3Months: boolean;
  employeeElgbleOrNext3MonthsDate: string;
  id: number;
}

export interface FetchEligibilityRequest {
  type: typeof eligibilityTypes.FETCH_ELIGIBILITY_REQUEST;
  payload: Eligibility;
}

export type FetchEligibilitySuccess = {
  type: typeof eligibilityTypes.FETCH_ELIGIBILITY_SUCCESS;
  payload: FetchEligibilitySuccessPayload;
};

export interface FetchEligibilitySuccessPayload {
  isSuccess: [];
}

export type FetchEligibilityFailure = {
  type: typeof eligibilityTypes.FETCH_ELIGIBILITY_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EligibilityActions =
  | FetchEligibilityRequest
  | FetchEligibilitySuccess
  | FetchEligibilityFailure;

//employerACAEdit
export interface EmployerACAEditState {
  pending: boolean;
  error: string | null;
  employerId: number;
  employerSignature: string;
}

export interface EmployerACAEdit {
  employerId: number;
  employerSignature: string;
  id: number;
}

export interface FetchEmployerACAEditRequest {
  type: typeof employerACAEditTypes.FETCH_EMPLOYERACAEDIT_REQUEST;
  payload: EmployerACAEdit;
}

export type FetchEmployerACAEditSuccess = {
  type: typeof employerACAEditTypes.FETCH_EMPLOYERACAEDIT_SUCCESS;
  payload: FetchEmployerACAEditSuccessPayload;
};

export interface FetchEmployerACAEditSuccessPayload {
  isSuccess: [];
}

export type FetchEmployerACAEditFailure = {
  type: typeof employerACAEditTypes.FETCH_EMPLOYERACAEDIT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EmployerACAEditActions =
  | FetchEmployerACAEditRequest
  | FetchEmployerACAEditSuccess
  | FetchEmployerACAEditFailure;

// ACA preview pdf
export interface GetACAPreviewState {
  pending: boolean;
  error: string | null;
}

export interface FetchGetACAPreviewRequest {
  type: typeof getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_REQUEST;
  payload: any;
}

export type FetchGetACAPreviewSuccess = {
  type: typeof getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_SUCCESS;
  payload: any;
};

export type FetchGetACAPreviewFailure = {
  type: typeof getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACAPreviewActions =
  | FetchGetACAPreviewRequest
  | FetchGetACAPreviewSuccess
  | FetchGetACAPreviewFailure;

export interface GetACAPreviewResponse {
  data: {};
}

//ACA Download pdf
export interface GetACADownloadState {
  pending: boolean;
  error: string | null;
}

export interface FetchGetACADownloadRequest {
  type: typeof getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_REQUEST;
  payload: any;
}

export type FetchGetACADownloadSuccess = {
  type: typeof getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_SUCCESS;
  payload: any;
};

export type FetchGetACADownloadFailure = {
  type: typeof getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACADownloadActions =
  | FetchGetACADownloadRequest
  | FetchGetACADownloadSuccess
  | FetchGetACADownloadFailure;

export interface GetACADownloadResponse {
  data: {};
}

//ACA Email pdf
export interface GetACAEmailState {
  pending: boolean;
  error: string | null;
}

export interface FetchGetACAEmailRequest {
  type: typeof getACAEmailTypes.FETCH_GET_ACA_EMAIL_REQUEST;
  payload: any;
}

export type FetchGetACAEmailSuccess = {
  type: typeof getACAEmailTypes.FETCH_GET_ACA_EMAIL_SUCCESS;
  payload: any;
};

export type FetchGetACAEmailFailure = {
  type: typeof getACAEmailTypes.FETCH_GET_ACA_EMAIL_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetACAEmailActions =
  | FetchGetACAEmailRequest
  | FetchGetACAEmailSuccess
  | FetchGetACAEmailFailure;

export interface GetACAEmailResponse {
  data: {};
}

export type AllEmployersByTypeActions =
  | FetchAllEmployersByTypeRequest
  | FetchAllEmployersByTypeSuccess
  | FetchAllEmployersByTypeFailure;

export interface FetchAllEmployersByTypeRequest {
  type: typeof allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_REQUEST;
  payload: any;
}

export type FetchAllEmployersByTypeSuccess = {
  type: typeof allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_SUCCESS;
  payload: FetchAllEmployersSuccessPayload;
};

export type FetchAllEmployersByTypeFailure = {
  type: typeof allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchAllEmployersByTypeSuccessPayload {
  employer: IEmployers[];
}

export interface AllEmployersByTypeState {
  pending: boolean;
  error: string | null;
  employer: IEmployers[];
  data: IEmployers[];
}

//downloadHolidayTemp
export interface DownloadHolidayTempState {
  pending: boolean;
  error: string | null;
}

export interface FetchDownloadHolidayTempRequest {
  type: typeof downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_REQUEST;
  payload: any;
}

export type FetchDownloadHolidayTempSuccess = {
  type: typeof downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_SUCCESS;
  payload: any;
};

export type FetchDownloadHolidayTempFailure = {
  type: typeof downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DownloadHolidayTempActions =
  | FetchDownloadHolidayTempRequest
  | FetchDownloadHolidayTempSuccess
  | FetchDownloadHolidayTempFailure;

export interface DownloadHolidayTempResponse {
  data: {};
}

//uploadHolidayList
export interface UploadHolidayListState {
  pending: boolean;
  error: null | string;
  formData: any;
}

export interface FetchUploadHolidayListRequest {
  type: typeof uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_REQUEST;
  payload: any;
}

export type FetchUploadHolidayListSuccess = {
  type: typeof uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_SUCCESS;
  payload: FetchUploadHolidayListSuccessPayload;
};

export type FetchUploadHolidayListSuccessPayload = {
  holidayList: [];
};
export type FetchUploadHolidayListFailure = {
  type: typeof uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type UploadHolidayListActions =
  | FetchUploadHolidayListRequest
  | FetchUploadHolidayListSuccess
  | FetchUploadHolidayListFailure;

export interface UploadHolidayListResponse {
  data: {};
}

//getAllHolidayLists
export interface GetHolidayListState {
  pending: boolean;
  error: null | string;
  id: number;
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  holidayList: [];
  errorMessages: [];
  data: {};
}

export interface IHolidayList {
  id: number;
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  holidayList: [];
  errorMessages: [];
}

export interface FetchGetHolidayListRequest {
  type: typeof getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_REQUEST;
  payload: any;
}

export type FetchGetHolidayListSuccess = {
  type: typeof getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_SUCCESS;
  payload: FetchGetHolidayListSuccessPayload;
};

export interface FetchGetHolidayListSuccessPayload {
  id: number;
  qleEnabled: boolean;
  acaEnabled: boolean;
  acaEmployerWontOfferHealthcover: boolean;
  acaEmployerHealthcoverToEmployee: boolean;
  acaEmployeePremiumForPlan: number;
  holidayList: [];
  errorMessages: [];
  isSuccess: boolean;
}

export type FetchGetHolidayListFailure = {
  type: typeof getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetHolidayListActions =
  | FetchGetHolidayListRequest
  | FetchGetHolidayListSuccess
  | FetchGetHolidayListFailure;

export interface GetHolidayListResponse {
  data: {};
}

export interface UploadImageState {
  pending: boolean;
  error: null | string;
  formData: any;
}

export interface FetchUploadImageRequest {
  type: typeof uploadImageTypes.FETCH_UPLOADIMAGE_REQUEST;
  payload: any;
}

export type FetchUploadImageSuccess = {
  type: typeof uploadImageTypes.FETCH_UPLOADIMAGE_SUCCESS;
  payload: FetchUploadImageSuccessPayload;
};

export type FetchUploadImageSuccessPayload = {
  isSuccess: boolean;
};

export type FetchUploadImageFailure = {
  type: typeof uploadImageTypes.FETCH_UPLOADIMAGE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type UploadImageActions =
  | FetchUploadImageRequest
  | FetchUploadImageSuccess
  | FetchUploadImageFailure;

export interface GetUploadImageState {
  pending: boolean;
  error: string | null;
}

export interface FetchGetUploadImageRequest {
  type: typeof getUploadImageTypes.FETCH_GET_UPLOADIMAGE_REQUEST;
  payload: any;
}

export type FetchGetUploadImageSuccess = {
  type: typeof getUploadImageTypes.FETCH_GET_UPLOADIMAGE_SUCCESS;
  payload: any;
};

export type FetchGetUploadImageFailure = {
  type: typeof getUploadImageTypes.FETCH_GET_UPLOADIMAGE_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetUploadImageActions =
  | FetchGetUploadImageRequest
  | FetchGetUploadImageSuccess
  | FetchGetUploadImageFailure;

export interface GetUploadImageResponse {
  data: {};
}

// Logout
export interface LogoutState {
  pending: boolean;
  error: string | null;
}

export interface FetchLogoutRequest {
  type: typeof logOutTypes.FETCH_LOGOUT_REQUEST;
  payload: any;
}

export type FetchLogoutSuccess = {
  type: typeof logOutTypes.FETCH_LOGOUT_SUCCESS;
  payload: FetchLogoutSuccessPayload;
};

export interface FetchLogoutSuccessPayload {
  errorMessages: [];
  isSuccess: boolean;
}

export type FetchLogoutFailure = {
  type: typeof logOutTypes.FETCH_LOGOUT_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type LogoutActions =
  | FetchLogoutRequest
  | FetchLogoutSuccess
  | FetchLogoutFailure;

export interface FetchActiveUserRequest {
  type: typeof ActiveUserTypes.FETCH_ACTIVE_USER_REQUEST;
  payload: any;
}
export type FetchActiveUserSuccess = {
  type: typeof ActiveUserTypes.FETCH_ACTIVE_USER_SUCCESS;
  payload: FetchUserSuccessPayload;
};

export interface FetchActiveUserSuccessPayload {
  users: IUser[];
}

export type FetchActiveUserFailure = {
  type: typeof ActiveUserTypes.FETCH_ACTIVE_USER_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type ActiveUserActions =
  | FetchActiveUserRequest
  | FetchActiveUserSuccess
  | FetchActiveUserFailure;
  export interface eventStatusState {
    pending: boolean;
    error: string | null;
    id: string;
    data: any;
  }
  
  export interface FetchEventStatusRequest {
    type: typeof eventStatusTypes.FETCH_EVENT_STATUS_REQUEST;
    payload: any;
  }
  
  export type FetchEventStatusSuccess = {
    type: typeof eventStatusTypes.FETCH_EVENT_STATUS_SUCCESS;
    payload: any;
  };
  
  export type FetchEventStatusFailure = {
    type: typeof eventStatusTypes.FETCH_EVENT_STATUS_FAILURE;
    payload: FetchPostsFailurePayload;
  };
  
  export type EventStatusActions =
    | FetchEventStatusRequest
    | FetchEventStatusSuccess
    | FetchEventStatusFailure;
  
  export interface EventStatus {    
    pending: boolean;
    error: string | null;
    data: any;
  }

  export interface FetchEventStatusSuccessPayload {
    payload: EventStatus[];
  }