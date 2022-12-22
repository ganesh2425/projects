import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEligibilityFailure,
  fetchEligibilitySuccess,
} from "../../actions/acaActions/eligibilityActions";
import { eligibilityTypes } from "../../constants/actionTypes";
import { eligibleDetails } from "../../services/acaApi";

function* fetchEligibilitySaga({ payload }: any): any {
  try {

    const response = yield call(eligibleDetails, payload);
    console.log(response);
    yield put(

      fetchEligibilitySuccess(
        response.data
        
        ));

  } catch (e: any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchEligibilityFailure({
        error: message,
        message: e.message,
      })
    );
  }
}

function* eligibleSaga() {
  yield all([takeLatest(eligibilityTypes.FETCH_ELIGIBILITY_REQUEST,fetchEligibilitySaga),]);
}

export default eligibleSaga;
