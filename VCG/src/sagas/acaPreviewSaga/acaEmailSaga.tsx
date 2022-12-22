import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetACAEmailFailure,
    fetchGetACAEmailSuccess
} from "../../actions/acaPreviewAction/acaEmailActions";
import { getACAEmailTypes } from '../../constants/actionTypes';
import { getACAEmail } from "../../services/acaPreviewApi";

function* fetchGetACAEmailSaga({ payload }: any): any {
    try {
       
        const response = yield call(getACAEmail, payload);
    //    console.log(response)
       
        yield put(
            fetchGetACAEmailSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetACAEmailFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getACAEmailSaga() {
    yield all([takeLatest(getACAEmailTypes.FETCH_GET_ACA_EMAIL_REQUEST, fetchGetACAEmailSaga)]);
}

export default getACAEmailSaga;