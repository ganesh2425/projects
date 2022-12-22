import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchUpdateEmpQLEStepsFailure,
  fetchUpdateEmpQLEStepsSuccess,
} from "../../actions/employersActions/updateEmpQLEStepsActions";
import { updateEmpQLEStepsTypes } from "../../constants/actionTypes";
import { updateEmployerQLESteps} from "../../services/employerApi";

function* fetchUpdateEmpQLEStepsSaga({ payload }: any): any {
  try {
    const response = yield call(updateEmployerQLESteps, payload);
    console.log(response);

    yield put(fetchUpdateEmpQLEStepsSuccess(response.data));
  } catch (e:any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchUpdateEmpQLEStepsFailure({
        error: message,
        message:e.message
      })
    );
  }
}

function* updateEmpQLEStepsSaga() {
  yield all([
    takeLatest(updateEmpQLEStepsTypes.FETCH_UPDATEEMPQLESTEPS_REQUEST, fetchUpdateEmpQLEStepsSaga),
  ]);
}

export default updateEmpQLEStepsSaga;
