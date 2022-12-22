import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchHealthPlanFailure,
    fetchHealthPlanSuccess
} from "../../actions/acaActions/healthPlanActions";
import {healthPlanTypes} from '../../constants/actionTypes';
import {healthPlanDetails} from "../../services/acaApi";

function* fetchHealthPlanSaga({payload}: any): any {
    try {
        const response = yield call(healthPlanDetails, payload);
        console.log(response);
                   
            yield put(
                fetchHealthPlanSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchHealthPlanFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* acaHealthPlanSaga() {
    yield all([takeLatest(healthPlanTypes.FETCH_HEALTHPLAN_REQUEST, fetchHealthPlanSaga)]);
}

export default acaHealthPlanSaga;