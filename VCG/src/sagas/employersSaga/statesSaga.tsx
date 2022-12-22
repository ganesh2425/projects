import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSTATESFailure,
    fetchSTATESSuccess
} from "../../actions/employersActions/statesActions";
import {statesTypes} from '../../constants/actionTypes';
import {getStates} from "../../services/employerApi";

function* fetchSTATESSaga({payload}: any): any {
    try {
        const response = yield call(getStates, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSTATESSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchSTATESFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* statesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(statesTypes.FETCH_STATES_REQUEST, fetchSTATESSaga)]);
}

export default statesSaga;