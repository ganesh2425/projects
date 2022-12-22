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
    fetchAllQleFaqsFailure,
    fetchAllQleFaqsSuccess
} from "../../actions/qleFaqActions/allFaqsActions";
import {allQleFaqsTypes} from '../../constants/actionTypes';
import {getAllQleFaqsDetails} from "../../services/qleFaqApi";

function* fetchAllQleFaqsSaga({payload}: any): any {
    try {
        console.log("*****************Entering Saga**********************")
        const response: any = yield call(getAllQleFaqsDetails, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
      
        yield put(
            fetchAllQleFaqsSuccess({
            faq: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchAllQleFaqsFailure({
            error: message,
          })
        );
      }
}

function* allQleFaqsSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allQleFaqsTypes.FETCH_ALLQLEFAQS_REQUEST, fetchAllQleFaqsSaga)]);
}

export default allQleFaqsSaga;