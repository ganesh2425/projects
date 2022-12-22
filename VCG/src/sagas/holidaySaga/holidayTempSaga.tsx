import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDownloadHolidayTempFailure,
  fetchDownloadHolidayTempSuccess,
} from "../../actions/holidayActions/holidayTempActions";
import { downloadHolidayTemp } from "../../constants/actionTypes";
import { getDownloadHolidayTemp } from "../../services/holidayApi";

function* fetchDownloadHolidayTempSaga({ payload }: any): any {
  try {
    const response = yield call(getDownloadHolidayTemp, payload);
    yield put(fetchDownloadHolidayTempSuccess(response.data));
  } catch (e: any) {
    yield put(
      fetchDownloadHolidayTempFailure({
        error: "Unauthorized",
        message: e.message,
      })
    );
  }
}

function* holidaySaga() {
  yield all([
    takeLatest(
      downloadHolidayTemp.FETCH_DOWNLOAD_HOLIDAY_TEMP_REQUEST,
      fetchDownloadHolidayTempSaga
    ),
  ]);
}

export default holidaySaga;
