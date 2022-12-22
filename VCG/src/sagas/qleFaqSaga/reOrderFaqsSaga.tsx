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
    fetchAllFaqsByEmpFailure,
    fetchAllFaqsByEmpSuccess
} from "../../actions/qleFaqActions/allFaqsByEmployerActions";
import {allReOrderedFaqsTypes, allQleFaqsTypes} from '../../constants/actionTypes';
import {saveReOrderedFaqs, getAllQleFaqsDetails} from "../../services/qleFaqApi";

function* fetchAllReOrderedFaqs({payload}: any): any {
    try {
        console.log("*****************Entering Saga**********************")
        const response: any = yield call(saveReOrderedFaqs, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
      
        yield put(
            fetchAllFaqsByEmpSuccess({
            faq: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchAllFaqsByEmpFailure({
            error: message,
          })
        );
      }
}

function* allReOrderedFaqsSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allReOrderedFaqsTypes.FETCH_ALLREORDEREDFAQS_REQUEST, fetchAllReOrderedFaqs)]);
}

export default allReOrderedFaqsSaga;