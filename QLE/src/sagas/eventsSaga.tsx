import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchEVENTSFailure,
    fetchEVENTSSuccess
} from "../actions/eventsActions";
import {eventsTypes} from '../constants/actionTypes';
import {getEVENTSDetails} from "../services/eventsApi";

function* fetchEVENTSSaga({payload}: any): any {
    try {
        const response = yield call(getEVENTSDetails, payload);
        if (response.data) {                 
            yield put(
                fetchEVENTSSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchEVENTSFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* eventsSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(eventsTypes.FETCH_EVENTS_REQUEST, fetchEVENTSSaga)]);
}

export default eventsSaga;