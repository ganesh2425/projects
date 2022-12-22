import {
  all,
  call,
  put,
  takeLatest,
  ForkEffect,
  AllEffect,
} from "redux-saga/effects";
import {
  fetchSTATESFailure,
  fetchSTATESSuccess,
} from "../actions/statesActions";
import { statesTypes } from "../constants/actionTypes";
import { getStates } from "../services/statesApi";

function* fetchSTATESSaga({ payload }: any): any {
  try {
    const response = yield call(getStates, payload);
    console.log(response);
    if (response.data) {
      yield put(fetchSTATESSuccess(response.data));
    } else {
      throw response;
    }
  } catch (e: any) {
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchSTATESFailure({
        error: "Unauthorized",
      })
    );
  }
}

function* statesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(statesTypes.FETCH_STATES_REQUEST, fetchSTATESSaga)]);
}

export default statesSaga;
