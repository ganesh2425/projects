import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEmpNewYearPlanFailure,
    fetchEmpNewYearPlanSuccess
} from "../../actions/employersActions/newYearPlanActions";
import {empNewYearPlanTypes} from '../../constants/actionTypes';
import {getNewYearPlan} from "../../services/employerApi";

function* fetchEmpNewYearPlanSaga({payload}: any): any {
    try {
        const response = yield call(getNewYearPlan, payload);
        console.log(response);
                   
            yield put(
                fetchEmpNewYearPlanSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchEmpNewYearPlanFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* newYearPlanSaga() {
    yield all([takeLatest(empNewYearPlanTypes.FETCH_EMPNEWYEARPLAN_REQUEST, fetchEmpNewYearPlanSaga)]);
}

export default newYearPlanSaga;