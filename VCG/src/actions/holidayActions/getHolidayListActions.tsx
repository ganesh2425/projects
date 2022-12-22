import { getHolidayListTypes } from "../../constants/actionTypes";
import {
  FetchGetHolidayListRequest,
  FetchGetHolidayListSuccess,
  FetchGetHolidayListFailure,
  FetchGetHolidayListSuccessPayload,
  FetchPostsFailurePayload,
} from "../../interfaces/types";

export const fetchGetHolidayListRequest = (
  payload: any
): FetchGetHolidayListRequest => ({
  type: getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_REQUEST,
  payload,
});

export const fetchGetHolidayListSuccess = (
  payload: any
): FetchGetHolidayListSuccess => ({
  type: getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_SUCCESS,
  payload,
});

export const fetchGetHolidayListFailure = (
  payload: FetchPostsFailurePayload
): FetchGetHolidayListFailure => ({
  type: getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_FAILURE,
  payload,
});
