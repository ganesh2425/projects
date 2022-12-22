import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchreLoginFailure,
    fetchreLoginSuccess
} from "../../actions/resendLink/loginActions";
import {reLoginTypes} from '../../constants/actionTypes';
import {getreAuthDetails} from "../../services/reLoginApi";

function* fetchreLoginSaga({payload}: any): any {
    try {
        const response = yield call(getreAuthDetails, payload);
        console.log(response);
                     
            yield put(
                fetchreLoginSuccess(
                    response.data
                )
            );
         
       
    } catch (e) {
        yield put(
            fetchreLoginFailure({
                error: 'Unauthorized'
            })
        );
    }
}

function* reLoginSaga() {
    yield all([takeLatest(reLoginTypes.FETCH_RELOGIN_REQUEST, fetchreLoginSaga)]);
}

export default reLoginSaga;