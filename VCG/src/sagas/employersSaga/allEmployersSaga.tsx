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
    fetchAllEmployersFailure,
    fetchAllEmployersSuccess
} from "../../actions/employersActions/allEmployersActions";
import {allEmployersTypes} from '../../constants/actionTypes';
import {getAllEmployerDetails} from "../../services/employerApi";

function* fetchAllEmployersSaga({payload}: any): any {
    try {
        const response: any = yield call(getAllEmployerDetails, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        console.log(response);
      
        yield put(
          fetchAllEmployersSuccess({
            employer: response.data,
          })
        );
      } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchAllEmployersFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allEmployersSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allEmployersTypes.FETCH_ALLEMPLOYERS_REQUEST, fetchAllEmployersSaga)]);
}

export default allEmployersSaga;