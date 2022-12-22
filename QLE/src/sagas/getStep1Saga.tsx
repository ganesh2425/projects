import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetStep1Failure,
    fetchGetStep1Success
} from "../actions/getStep1Actions";
import {getStep1Types} from '../constants/actionTypes';
import {getSTEP1DetailsByEventId} from "../services/step1Api";

function* fetchGetStep1Saga({payload}: any): any {
    try {
        const response = yield call(getSTEP1DetailsByEventId, payload);
        console.log(response);
            yield put(
                fetchGetStep1Success(
                    response.data
                )
            );
    } catch (e) {
        yield put(
            fetchGetStep1Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getStep1Saga() {
    yield all([takeLatest(getStep1Types.FETCH_GETSTEP1_REQUEST, fetchGetStep1Saga)]);
}

export default getStep1Saga;