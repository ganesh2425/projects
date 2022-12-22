import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditStep3Failure,
    fetchEditStep3Success
} from "../actions/editStep3Actions";
import {editStep3Types} from '../constants/actionTypes';
import {getEditStep3Details} from "../services/step3Api";

function* fetchEditStep3Saga({payload}: any): any {
    try {
        const response = yield call(getEditStep3Details, payload);
        console.log(response);
                   
            yield put(
                fetchEditStep3Success(
                    response.data
                )
            );
         
       
    } catch (e) {
        yield put(
            fetchEditStep3Failure({
                error: 'Unauthorized'
            })
        );
    }
}

function* editStep3Saga() {
    yield all([takeLatest(editStep3Types.FETCH_EDITSTEP3_REQUEST, fetchEditStep3Saga)]);
}

export default editStep3Saga;