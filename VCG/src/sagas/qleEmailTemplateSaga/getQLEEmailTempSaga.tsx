import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetQLEEmailTemplateFailure,
    fetchGetQLEEmailTemplateSuccess
} from "../../actions/qleEmailTemplateActions/getQLEEmailTemplateActions";
import { getQLEEmailTemplateTypes } from '../../constants/actionTypes';
import { getQLEEmailTempById } from "../../services/qleEmailTemplateApi";

function* fetchGetQLEEmailTemplateSaga({ payload }: any): any {
    try {
        const response = yield call(getQLEEmailTempById, payload)
        yield put(
            fetchGetQLEEmailTemplateSuccess(
                response.data
            )
        );

    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetQLEEmailTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}
function* getQLEEmailTemplateSaga() {
    yield all([takeLatest(getQLEEmailTemplateTypes.FETCH_GETQLEEMAILTEMPLATE_REQUEST, fetchGetQLEEmailTemplateSaga)]);
}

export default getQLEEmailTemplateSaga;