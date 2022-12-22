import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSTEP3Failure,
    fetchSTEP3Success
} from "../actions/step3Actions";
import {step3Types} from '../constants/actionTypes';
import {getAddSTEP3Details} from "../services/step3Api";

function* fetchStep3Saga({payload}: any): any {
    try {
        const response = yield call(getAddSTEP3Details, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSTEP3Success(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchSTEP3Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* step3Saga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(step3Types.FETCH_STEP3_REQUEST, fetchStep3Saga)]);
}

export default step3Saga;