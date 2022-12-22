import { employerACAEditTypes } from "../../constants/actionTypes";
import {
  FetchEmployerACAEditRequest,
  FetchEmployerACAEditSuccess,
  FetchEmployerACAEditFailure,
  FetchEmployerACAEditSuccessPayload,
  FetchPostsFailurePayload,
  EmployerACAEdit,
} from "../../interfaces/types";

export const fetchEmployerACAEditRequest = (
  payload: EmployerACAEdit
): FetchEmployerACAEditRequest => ({
  type: employerACAEditTypes.FETCH_EMPLOYERACAEDIT_REQUEST,
  payload,
});

export const fetchEmployerACAEditSuccess = (
  payload: FetchEmployerACAEditSuccessPayload
): FetchEmployerACAEditSuccess => ({
  type: employerACAEditTypes.FETCH_EMPLOYERACAEDIT_SUCCESS,
  payload,
});

export const fetchEmployerACAEditFailure = (
  payload: FetchPostsFailurePayload
): FetchEmployerACAEditFailure => ({
  type: employerACAEditTypes.FETCH_EMPLOYERACAEDIT_FAILURE,
  payload,
});
