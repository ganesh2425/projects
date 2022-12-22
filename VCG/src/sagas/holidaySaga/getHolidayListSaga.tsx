import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchGetHolidayListSuccess,
  fetchGetHolidayListFailure,
} from "../../actions/holidayActions/getHolidayListActions";
import { getHolidayListTypes } from "../../constants/actionTypes";
import { getHolidayDetails } from "../../services/holidayApi";

function* fetchGetHolidayListSaga({ payload }: any): any {
  try {
    const response = yield call(getHolidayDetails, payload);
    yield put(fetchGetHolidayListSuccess(response.data));
  } catch (e: any) {
    console.log(e);
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchGetHolidayListFailure({
        error: message,
        message: e.message,
      })
    );
  }
}

function* getHolidaySaga() {
  yield all([
    takeLatest(
      getHolidayListTypes.FETCH_GET_HOLIDAY_LIST_REQUEST,
      fetchGetHolidayListSaga
    ),
  ]);
}

export default getHolidaySaga;
