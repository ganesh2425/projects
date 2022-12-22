import {
  loginTypes, addRoleTypes, allRolesTypes, delRoleTypes, getRoleTypes, allPrivilegesTypes, UserTypes, editRoleTypes, editUserTypes, getUserTypes, allRolesetTypes, addUserTypes, delUserTypes
  , delEmployerTypes, allEmployersTypes, allQleFaqsTypes, editFaqTypes, addFaqTypes, getFaqTypes, delFaqTypes, allFaqsByEmployerTypes, allReOrderedFaqsTypes
												   
} from "../constants/actionTypes";


export type FetchAllQleFaqsFailure = {
  type: typeof allQleFaqsTypes.FETCH_ALLQLEFAQS_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchPostsFailurePayload {
  error: string;
}

export interface FetchAllQleFaqsRequest {
  type: typeof allQleFaqsTypes.FETCH_ALLQLEFAQS_REQUEST;
  payload: AllQleFaq;
}

export type FetchAllQleFaqsSuccess = {
  type: typeof allQleFaqsTypes.FETCH_ALLQLEFAQS_SUCCESS;
  payload: FetchAllQleFaqsSuccessPayload;
};

export interface AllQleFaq {
  number:number;
  type : string;
  question: string;
  answer: string;
  employer: string
}

export interface AuthResponse {
  token: string;
}

export interface FetchAllQleFaqSuccessPayload {
  id: number;
  number:number;
  type : string;
  question: string;
  answer: string;
  employer: string
}

export interface AllQleFaqsState {
  pending: boolean;
  error: string | null;
  type : '';
  faq: IFaq[];
  data: IFaq[];
}


export type AllQleFaqsActions =
  | FetchAllQleFaqsRequest
  | FetchAllQleFaqsSuccess
  | FetchAllQleFaqsFailure;

export interface FetchAllQleFaqsSuccessPayload {
  faq: IFaq[];
}


export interface IFaq {
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string,
  employerId: number,
}

//edit Faq
export interface EditFaqState {
  pending: boolean,
  error: string | null,
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string,
  data: {}
}

export interface EditFaq {
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string
}

export interface FetchEditFaqRequest {
  type: typeof editFaqTypes.FETCH_EDITFAQ_REQUEST;
  payload: EditFaq;
}

export type FetchEditFaqSuccess = {
  type: typeof editFaqTypes.FETCH_EDITFAQ_SUCCESS;
  payload: FetchEditFaqSuccessPayload;
};

export interface FetchEditFaqSuccessPayload {
  id: number,
  number:number,
  type : string,
  question: string,				
  answer: string,
  employer: string
}

export type FetchEditFaqFailure = {
  type: typeof editFaqTypes.FETCH_EDITFAQ_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type EditFaqActions =
  | FetchEditFaqRequest
  | FetchEditFaqSuccess
  | FetchEditFaqFailure;

//add faq
export interface AddFaqState {
  pending : boolean,
  error: string | null,
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string,
  data: {}
}

export interface AddFaq {
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string,
  employerId: number,
}

export interface FetchAddFaqRequest {
  type: typeof addFaqTypes.FETCH_ADDFAQ_REQUEST;
  payload: AddFaq;
}

export type FetchAddFaqSuccess = {
  type: typeof addFaqTypes.FETCH_ADDFAQ_SUCCESS;
  payload: FetchAddFaqSuccessPayload;
};

export interface FetchAddFaqSuccessPayload {
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
}

export type FetchAddFaqFailure = {
  type: typeof addFaqTypes.FETCH_ADDFAQ_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type AddFaqActions =
  | FetchAddFaqRequest
  | FetchAddFaqSuccess
  | FetchAddFaqFailure;

//get Faq
export interface GetFaqState {
  pending: boolean;
  error: string | null;
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string,
  employer: string,
  data: {}
}

export interface FetchGetFaqRequest {
  type: typeof getFaqTypes.FETCH_GETFAQ_REQUEST;
  payload: any;	
}

export interface FetchGetFaqSuccessPayload {
  id: number,
  number:number,
  type : string,
  question: string,
  answer: string															 
}

export type FetchGetFaqSuccess = {
  type: typeof getFaqTypes.FETCH_GETFAQ_SUCCESS;
  payload: FetchGetFaqSuccessPayload;
};

export type FetchGetFaqFailure = {
  type: typeof getFaqTypes.FETCH_GETFAQ_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type GetFaqActions =
  | FetchGetFaqRequest
  | FetchGetFaqSuccess
  | FetchGetFaqFailure;

export interface GetFaqResponse {
  data: {};
}

//Delete Faq
export interface DelFaqState {
  pending: boolean;
  error: string | null;
  data: any;
}

export interface FetchDelFaqRequest {
  type: typeof delFaqTypes.FETCH_DELFAQ_REQUEST;
  payload: any;
}

export type FetchDelFaqSuccess = {
  type: typeof delFaqTypes.FETCH_DELFAQ_SUCCESS;
  payload: any;
};

export type FetchDelFaqFailure = {
  type: typeof delFaqTypes.FETCH_DELFAQ_FAILURE;
  payload: FetchPostsFailurePayload;
};

export type DelFaqActions =
  | FetchDelFaqRequest
  | FetchDelFaqSuccess
  | FetchDelFaqFailure;
  
export interface DelResponse {
  data: string;
}

export type FetchAllFaqsByEmpFailure = {
  type: typeof allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_FAILURE;
  payload: FetchPostsFailurePayload;
};

export interface FetchAllFaqsByEmpRequest {
  type: typeof allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_REQUEST;
  payload: AllQleFaq;
}

export type FetchAllFaqsByEmpSuccess = {
  type: typeof allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_SUCCESS;
  payload: FetchAllQleFaqsSuccessPayload;
};

export interface FetchAllQleFaqsByEmpSuccessPayload {
  faq: IFaq[];
}

export type AllFaqsByEmpActions =
  | FetchAllFaqsByEmpRequest
  | FetchAllFaqsByEmpSuccess
  | FetchAllFaqsByEmpFailure;

  export interface AllFaqsByEmployerState {
    pending: boolean;
    error: string | null;
    faq: IFaq[];
    data: IFaq[];
  }

  export type AllReOrderedFaqsActions =
  | FetchAllReOrderedFaqsRequest
  | FetchAllReOrderedFaqsSuccess
  | FetchAllReOrderedFaqsFailure;

  export type FetchAllReOrderedFaqsFailure = {
    type: typeof allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_FAILURE;
    payload: FetchPostsFailurePayload;
  };
  
  export interface FetchAllReOrderedFaqsRequest {
    type: typeof allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_REQUEST;
    payload: AllQleFaq;
  }
  
  export type FetchAllReOrderedFaqsSuccess = {
    type: typeof allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_SUCCESS;
    payload: FetchAllQleFaqsSuccessPayload;
  };
  