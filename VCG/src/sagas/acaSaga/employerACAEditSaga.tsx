import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEmployerACAEditFailure,
  fetchEmployerACAEditSuccess,
} from "../../actions/acaActions/employerACAEditActions";
import { employerACAEditTypes } from "../../constants/actionTypes";
import { employerACAEdit } from "../../services/acaApi";

function* fetchEmployerACAEditSaga({ payload }: any): any {
  try {
    const response = yield call(employerACAEdit, payload);
    console.log(response);

    yield put(fetchEmployerACAEditSuccess(response.data));
  } catch (e: any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEmployerACAEditFailure({
        error: message,
        message: e.message,
      })
    );
  }
}

function* empACAEditSaga() {
  yield all([
    takeLatest(
      employerACAEditTypes.FETCH_EMPLOYERACAEDIT_REQUEST,
      fetchEmployerACAEditSaga
    ),
  ]);
}

export default empACAEditSaga;
