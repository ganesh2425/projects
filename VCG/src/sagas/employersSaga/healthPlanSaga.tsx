import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEmpHealthPlanFailure,
    fetchEmpHealthPlanSuccess
} from "../../actions/employersActions/healthPlanActions";
import {empHealthPlanTypes} from '../../constants/actionTypes';
import {getHealthPlan} from "../../services/employerApi";

function* fetchEmpHealthPlanSaga({payload}: any): any {console.log("saga");console.log(payload)
    try {
        const response = yield call(getHealthPlan, payload);
        console.log(response);
                   
            yield put(
                fetchEmpHealthPlanSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchEmpHealthPlanFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* healthPlanSaga() {
    yield all([takeLatest(empHealthPlanTypes.FETCH_EMPHEALTHPLAN_REQUEST, fetchEmpHealthPlanSaga)]);
}

export default healthPlanSaga;