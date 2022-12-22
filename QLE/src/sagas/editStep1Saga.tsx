import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditStep1Failure,
    fetchEditStep1Success
} from "../actions/editStep1Actions";
import {editStep1Types} from '../constants/actionTypes';
import {getEditStep1Details} from "../services/step1Api";

function* fetchEditStep1Saga({payload}: any): any {
    try {
        const response = yield call(getEditStep1Details, payload);
        console.log(response);
                   
            yield put(
                fetchEditStep1Success(
                    response.data
                )
            );
         
       
    } catch (e) {
        yield put(
            fetchEditStep1Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* editStep1Saga() {
    yield all([takeLatest(editStep1Types.FETCH_EDITSTEP1_REQUEST, fetchEditStep1Saga)]);
}

export default editStep1Saga;