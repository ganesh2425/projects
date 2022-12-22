import {all, call, put, takeLatest, ForkEffect, AllEffect} from "redux-saga/effects";
import {
    fetchPRIVACYFailure,
    fetchPRIVACYSuccess
} from "../actions/privacyActions";
import { privacyTypes } from "../constants/actionTypes";
import {getPRIVACYDetails} from "../services/privacyApi";


function* fetchPRIVACYSaga({payload}: any): any {
    try {
        const response = yield call(getPRIVACYDetails, payload);
        console.log(response);
        if (response.data) {
            yield put(
                fetchPRIVACYSuccess(
                    response.data
                )
            );
        } else {
            throw response;
        }
    } catch (e) {
        yield put(
            fetchPRIVACYFailure({
                error: "Unauthorized"
            })
        );
    }
}

function* privacySaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(privacyTypes.FETCH_PRIVACY_REQUEST, fetchPRIVACYSaga)]);
}

export default privacySaga;