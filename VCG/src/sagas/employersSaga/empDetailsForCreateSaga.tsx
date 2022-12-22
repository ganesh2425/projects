import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEmpDetailsForCreateFailure,
  fetchEmpDetailsForCreateSuccess,
} from "../../actions/employersActions/empDetailsForCreateActions";
import { empDetailsForCreateTypes } from "../../constants/actionTypes";
import { getEmpDetailsForCreate } from "../../services/employerApi";

function* fetchEmpDetailsForCreateSaga({ payload }: any): any {
  try {
    const response = yield call(getEmpDetailsForCreate, payload);
    console.log(response);

    yield put(fetchEmpDetailsForCreateSuccess(response.data));
  } catch (e:any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEmpDetailsForCreateFailure({
        error: message,
        message:e.message
      })
    );
  }
}

function* empDetailsForCreateSaga() {
  yield all([
    takeLatest(empDetailsForCreateTypes.FETCH_EMPDETAILSFORCREATE_REQUEST, fetchEmpDetailsForCreateSaga),
  ]);
}

export default empDetailsForCreateSaga;
