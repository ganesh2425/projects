import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditHealthPlanFailure,
    fetchEditHealthPlanSuccess
} from "../../actions/acaActions/editHealthPlanActions";
import {editHealthPlanTypes} from '../../constants/actionTypes';
import {editHealthDetails} from "../../services/acaApi";

function* fetchEditHealthPlanSaga({payload}: any): any {
    try {
        const response = yield call(editHealthDetails, payload);
        console.log(response);
                   
            yield put(
                fetchEditHealthPlanSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEditHealthPlanFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* editHealthPlanSaga() {
    yield all([takeLatest(editHealthPlanTypes.FETCH_EDITHEALTHPLAN_REQUEST, fetchEditHealthPlanSaga)]);
}

export default editHealthPlanSaga;