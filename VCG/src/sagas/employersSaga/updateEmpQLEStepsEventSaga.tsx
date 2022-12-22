import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUpdateEmpQLEStepsEventFailure,
  fetchUpdateEmpQLEStepsEventSuccess,
} from "../../actions/employersActions/updateEmpQLEStepsEventActions";
import { updateEmpQLEStepsEventTypes } from "../../constants/actionTypes";
import { updateEmployerQLEStepsEvent} from "../../services/employerApi";

function* fetchUpdateEmpQLEStepsEventSaga({ payload }: any): any {
  try {
    const response = yield call(updateEmployerQLEStepsEvent, payload);
    console.log(response);

    yield put(fetchUpdateEmpQLEStepsEventSuccess(response.data));
  } catch (e:any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchUpdateEmpQLEStepsEventFailure({
        error: message,
        message:e.message
      })
    );
  }
}

function* updateEmpQLEStepsEventSaga() {
  yield all([
    takeLatest(updateEmpQLEStepsEventTypes.FETCH_UPDATEEMPQLESTEPSEVENT_REQUEST, fetchUpdateEmpQLEStepsEventSaga),
  ]);
}

export default updateEmpQLEStepsEventSaga;
