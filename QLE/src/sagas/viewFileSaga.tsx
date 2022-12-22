import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchviewFileFailure,
    fetchviewFileSuccess
} from "../actions/viewFile.Actions";
import {viewFileTypes} from '../constants/actionTypes';
import {viewFileDetails} from "../services/viewFileApi";

function* fetchviewFileSaga({payload}: any): any {
    try {
        const response = yield call(viewFileDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchviewFileSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e) {
        yield put(
            fetchviewFileFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* viewFileSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(viewFileTypes.FETCH_VIEWFILE_REQUEST, fetchviewFileSaga)]);
}

export default viewFileSaga;