import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchEmployerFailure,
    fetchEmployerSuccess
} from "../actions/employerActions";
import {employerTypes} from '../constants/actionTypes';
import {getEmployerByName} from "../services/homeApi";

function* fetchEmployerSaga({payload}: any): any {
    try {
        const response = yield call(getEmployerByName, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchEmployerSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchEmployerFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* employerSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(employerTypes.FETCH_EMPLOYER_REQUEST, fetchEmployerSaga)]);
}

export default employerSaga;