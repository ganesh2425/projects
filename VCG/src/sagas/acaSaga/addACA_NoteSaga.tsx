import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAddNoteFailure,
  fetchAddNoteSuccess,
} from "../../actions/acaActions/ACA_AddNoteActions";
import { addNoteTypes } from "../../constants/actionTypes";
import { getAddNoteDetails } from "../../services/acaApi";

function* fetchAddNoteSaga({ payload }: any): any {
  try {
    const response = yield call(getAddNoteDetails, payload);
    console.log(response);

    yield put(fetchAddNoteSuccess(response.data));
  } catch (e: any) {
    // toast.error("Please Contact Administrator !!!!!!");
    let message = "";
    e === "Network Error" ? (message = e) : (message = e.message);
    yield put(
      fetchAddNoteFailure({
        error: message,
        message: e.message,
      })
    );
  }
}

function* addNoteSaga() {
  yield all([takeLatest(addNoteTypes.FETCH_ADDNOTE_REQUEST, fetchAddNoteSaga)]);
}

export default addNoteSaga;
