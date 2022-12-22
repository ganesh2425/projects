import { downloadHolidayTemp } from "../../constants/actionTypes";
import {
  FetchDownloadHolidayTempFailure,
  FetchPostsFailurePayload,
  FetchDownloadHolidayTempRequest,
  FetchDownloadHolidayTempSuccess,
} from "../../interfaces/types";

export const fetchDownloadHolidayTempRequest = (
  payload: any
): FetchDownloadHolidayTempRequest => ({
  type: downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_REQUEST,
  payload,
});

export const fetchDownloadHolidayTempSuccess = (
  payload: any
): FetchDownloadHolidayTempSuccess => ({
  type: downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_SUCCESS,
  payload,
});

export const fetchDownloadHolidayTempFailure = (
  payload: FetchPostsFailurePayload
): FetchDownloadHolidayTempFailure => ({
  type: downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_FAILURE,
  payload,
});
