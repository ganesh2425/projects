import {
  DownloadHolidayTempActions,
  DownloadHolidayTempState,
} from "../../interfaces/types";
import { downloadHolidayTemp } from "../../constants/actionTypes";
import { RootState } from "../index";

const initialState: DownloadHolidayTempState = {
  pending: false,
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: DownloadHolidayTempActions) => {
  switch (action.type) {
    case downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_SUCCESS:
      return {
        ...state,
        pending: false,
        ...action.payload,
        data: action.payload,
        error: null,
      };
    case downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_FAILURE:
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
export const downloadHolidayDetails = (state: RootState) =>
  state.downloadHoliday;
