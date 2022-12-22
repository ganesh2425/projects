import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSTEP2Failure,
    fetchSTEP2Success
} from "../actions/step2Actions";
import {step2Types} from '../constants/actionTypes';
import {getAddSTEP2Details} from "../services/step2Api";

function* fetchStep2Saga({payload}: any): any {
    try {
        const response = yield call(getAddSTEP2Details, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSTEP2Success(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchSTEP2Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* step2Saga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(step2Types.FETCH_STEP2_REQUEST, fetchStep2Saga)]);
}

export default step2Saga;