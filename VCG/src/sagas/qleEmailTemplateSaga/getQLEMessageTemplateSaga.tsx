import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetQLEMessageTemplateFailure,
    fetchGetQLEMessageTemplateSuccess
} from "../../actions/qleEmailTemplateActions/getQLEMessageTemplateActions";
import { getQLEMessageTemplateTypes } from '../../constants/actionTypes';
import { getQLEMessageTempById } from "../../services/qleEmailTemplateApi";

function* fetchGetQLEMessageTemplateSaga({ payload }: any): any {
    try {
        const response = yield call(getQLEMessageTempById, payload);
        yield put(
            fetchGetQLEMessageTemplateSuccess(
                response.data
            )
        );

    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetQLEMessageTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}
function* getQLEMessageTemplateSaga() {
    yield all([takeLatest(getQLEMessageTemplateTypes.FETCH_GETQLEMESSAGETEMPLATE_REQUEST, fetchGetQLEMessageTemplateSaga)]);
}

export default getQLEMessageTemplateSaga;