import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetACAMessageTemplateFailure,
    fetchGetACAMessageTemplateSuccess
} from "../../actions/acaEmailTemplateActions/getACAMessageTemplateActions";
import { getACAMessageTemplateTypes } from '../../constants/actionTypes';
import { getACAMessageTempById } from "../../services/acaEmailTemplateApi";

function* fetchGetACAMessageTemplateSaga({ payload }: any): any {
    try {
        const response = yield call(getACAMessageTempById, payload);

        yield put(
            fetchGetACAMessageTemplateSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetACAMessageTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getACAMessageTemplateSaga() {
    yield all([takeLatest(getACAMessageTemplateTypes.FETCH_GETACAMESSAGETEMPLATE_REQUEST, fetchGetACAMessageTemplateSaga)]);
}

export default getACAMessageTemplateSaga;