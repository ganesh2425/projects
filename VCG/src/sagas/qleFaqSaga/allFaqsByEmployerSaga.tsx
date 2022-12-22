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
import {allFaqsByEmployerTypes, allQleFaqsTypes} from '../../constants/actionTypes';
import {getAllFaqsByEmpDetails, getAllQleFaqsDetails} from "../../services/qleFaqApi";

function* fetchAllFaqsByEmpSaga({payload}: any): any {
    try {
        console.log("*****************Entering Saga**********************")
        const response: any = yield call(getAllFaqsByEmpDetails, payload);
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

function* allFaqsByEmployerSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allFaqsByEmployerTypes.FETCH_ALLFAQSBYEMP_REQUEST, fetchAllFaqsByEmpSaga)]);
}

export default allFaqsByEmployerSaga;