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
  fetchAllEmployersByTypeFailure,
    fetchAllEmployersByTypeRequest,
    fetchAllEmployersByTypeSuccess
} from "../../actions/employersActions/allEmployersByTypeActions";
import {allActiveEmployersTypes, allEmployersTypes} from '../../constants/actionTypes';
import {getAllEmployerByTypeDetails} from "../../services/employerApi";

function* fetchAllEmployersSaga({payload}: any): any {
    try {
        const response: any = yield call(getAllEmployerByTypeDetails, payload);
        //console.log("hererererere" + JSON.parse(JSON.parse(response.data)));
        yield put(
          fetchAllEmployersByTypeSuccess({
            employer: response.data,
          })
        );
      } catch (e: any) {  
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        // toast.error("Please Contact Administrator !!!!!!");
        // alert("Please Contact Administrator !!!!!!");

        yield put(
          fetchAllEmployersByTypeFailure({
            error: message,
            message:e.message
          })
        );
      }
}

function* allEmployersByTypeSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(allActiveEmployersTypes.FETCH_ALLACTIVEEMPLOYERS_REQUEST, fetchAllEmployersSaga)]);
}

export default allEmployersByTypeSaga;