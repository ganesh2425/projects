import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSTEP2CancelFailure,
    fetchSTEP2CancelSuccess
} from "../actions/step2CancelActions";
import {step2CancelTypes} from '../constants/actionTypes';
import {getAddSTEP2CancelDetails} from "../services/step2Api";

function* fetchStep2CancelSaga({payload}: any): any {
    try {
        const response = yield call(getAddSTEP2CancelDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSTEP2CancelSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchSTEP2CancelFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* step2CancelSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(step2CancelTypes.FETCH_STEP2CANCEL_REQUEST, fetchStep2CancelSaga)]);
}

export default step2CancelSaga;