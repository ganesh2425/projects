import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetStep3Failure,
    fetchGetStep3Success
} from "../actions/getStep3Actions";
import {getStep3Types} from '../constants/actionTypes';
import {getSTEP3DetailsByEventId} from "../services/step3Api";

function* fetchGetStep3Saga({payload}: any): any {
    try {
        const response = yield call(getSTEP3DetailsByEventId, payload);
        console.log(response);
            yield put(
                fetchGetStep3Success(
                    response.data
                )
            );
    } catch (e) {
        yield put(
            fetchGetStep3Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* getStep3Saga() {
    yield all([takeLatest(getStep3Types.FETCH_GETSTEP3_REQUEST, fetchGetStep3Saga)]);
}

export default getStep3Saga;