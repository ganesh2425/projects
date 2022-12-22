import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUploadHolidayListSuccess,
  fetchUploadHolidayListFailure,
} from "../../actions/holidayActions/uploadHolidayActions";
import { uploadHolidayListTypes } from "../../constants/actionTypes";
import { uploadHolidayDetails } from "../../services/holidayApi";

function* fetchUploadHolidayListSaga({ payload }: any): any {
  try {
    const response = yield call(uploadHolidayDetails, payload);
    console.log(response);
    yield put(fetchUploadHolidayListSuccess(response.data));
  } catch (e: any) {
    yield put(
      fetchUploadHolidayListFailure({
        error: "Unauthorized",
        message: e.message,
      })
    );
  }
}

function* uploadHolidaySaga() {
  yield all([
    takeLatest(
      uploadHolidayListTypes.FETCH_UPLOAD_HOLIDAY_LIST_REQUEST,
      fetchUploadHolidayListSaga
    ),
  ]);
}

export default uploadHolidaySaga;
