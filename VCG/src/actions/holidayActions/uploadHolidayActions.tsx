import { uploadHolidayListTypes } from "../../constants/actionTypes";
import {
  FetchUploadHolidayListRequest,
  FetchUploadHolidayListSuccess,
  FetchUploadHolidayListFailure,
  FetchPostsFailurePayload,
  FetchUploadHolidayListSuccessPayload,
} from "../../interfaces/types";

export const fetchUploadHolidayListRequest = (
  payload: any
): FetchUploadHolidayListRequest => ({
  type: uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_REQUEST,
  payload,
});

export const fetchUploadHolidayListSuccess = (
  payload: FetchUploadHolidayListSuccessPayload
): FetchUploadHolidayListSuccess => ({
  type: uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_SUCCESS,
  payload,
});

export const fetchUploadHolidayListFailure = (
  payload: FetchPostsFailurePayload
): FetchUploadHolidayListFailure => ({
  type: uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_FAILURE,
  payload,
});

export const setUploadHolidayListActions = (payload: any, history: any) => ({
  type: uploadHolidayListTypes.UPLOAD_HOLIDAY_LIST_INFO,
  payload,
  history,
});
