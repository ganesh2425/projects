import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchSlugFailure,
    fetchSlugSuccess
} from "../actions/slugActions";
import {slugTypes} from '../constants/actionTypes';
import {getEmployerBySlug} from "../services/urlSlugApi";

function* fetchEmployerBySlugSaga({payload}: any): any {
    try {
        const response = yield call(getEmployerBySlug, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchSlugSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchSlugFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* employerBySlugSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(slugTypes.FETCH_SLUG_REQUEST, fetchEmployerBySlugSaga)]);
}

export default employerBySlugSaga;