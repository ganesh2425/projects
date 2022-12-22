import { toast } from "react-toastify";
import {
  all,
  AllEffect,
  call,
  ForkEffect,
  put,
  takeLatest,
} from "redux-saga/effects";
import {
  fetchAllACAFailure,
  fetchAllACASuccess,
} from "../../actions/acaActions/allACAActions";
import { allACATypes } from "../../constants/actionTypes";
import { getAllACADetails } from "../../services/acaApi";

function* fetchAllACASaga({ payload }: any): any {
  try {
    const response: any = yield call(getAllACADetails, payload);
    console.log(response);

    yield put(
      fetchAllACASuccess({
        aca: response.data,
      })
    );
  } catch (e: any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchAllACAFailure({
        error: message,
        message: e.message,
      })
    );
  }
}

function* allACASaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(allACATypes.FETCH_ALLACA_REQUEST, fetchAllACASaga)]);
}

export default allACASaga;
