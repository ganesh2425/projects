import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSTEP1Failure,
    fetchSTEP1Success
} from "../actions/step1Actions";
import {step1Types} from '../constants/actionTypes';
import {getAddSTEP1Details} from "../services/step1Api";

function* fetchStep1Saga({payload}: any): any {
    try {
        const response = yield call(getAddSTEP1Details, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSTEP1Success(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchSTEP1Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* Step1Saga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(step1Types.FETCH_STEP1_REQUEST, fetchStep1Saga)]);
}

export default Step1Saga;