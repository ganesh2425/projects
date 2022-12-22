import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchNewYearPlanFailure,
    fetchNewYearPlanSuccess
} from "../../actions/acaActions/newYearPlanActions";
import {newYearPlanTypes} from '../../constants/actionTypes';
import {newYearPlan} from "../../services/acaApi";

function* fetchNewYearPlanSaga({payload}: any): any {
    try {
        const response = yield call(newYearPlan, payload);
        console.log(response);
                   
            yield put(
                fetchNewYearPlanSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchNewYearPlanFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* acaNewYearPlanSaga() {
    yield all([takeLatest(newYearPlanTypes.FETCH_NEWYEARPLAN_REQUEST, fetchNewYearPlanSaga)]);
}

export default acaNewYearPlanSaga;