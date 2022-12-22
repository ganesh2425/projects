import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchFAQFailure,
    fetchFAQSuccess
} from "../actions/faqActions";
import {faqTypes} from '../constants/actionTypes';
import {getFAQDetails} from "../services/faqApi";

function* fetchFAQSaga({payload}: any): any {
    try {
        const response = yield call(getFAQDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchFAQSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchFAQFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* FaqSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(faqTypes.FETCH_FAQ_REQUEST, fetchFAQSaga)]);
}

export default FaqSaga;