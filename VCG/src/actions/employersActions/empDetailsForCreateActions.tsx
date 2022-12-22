import { empDetailsForCreateTypes } from "../../constants/actionTypes";
import {
  FetchEmpDetailsForCreateFailure,
  FetchPostsFailurePayload,
  FetchEmpDetailsForCreateRequest,
  FetchEmpDetailsForCreateSuccess,
  FetchEmpDetailsForCreateSuccessPayload,
} from "../../interfaces/types";

export const fetchEmpDetailsForCreateRequest = (
  payload: any
): FetchEmpDetailsForCreateRequest => ({
  type: empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_REQUEST,
  payload,
});

export const fetchEmpDetailsForCreateSuccess = (
  payload: any
): FetchEmpDetailsForCreateSuccess => ({
  type: empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_SUCCESS,
  payload,
});

export const fetchEmpDetailsForCreateFailure = (
  payload: FetchPostsFailurePayload
): FetchEmpDetailsForCreateFailure => ({
  type: empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_FAILURE,
  payload,
});
