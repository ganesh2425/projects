import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditACAMessageTemplateFailure,
    fetchEditACAMessageTemplateSuccess
} from "../../actions/acaEmailTemplateActions/editACAMessageTemplateActions";
import { editACAMessageTemplateTypes } from '../../constants/actionTypes';
import { getEditACAMessageTempDetails } from "../../services/acaEmailTemplateApi";

function* fetchEditACAMessageTemplateSaga({ payload }: any): any {
    try {
        const response = yield call(getEditACAMessageTempDetails, payload);
        yield put(
            fetchEditACAMessageTemplateSuccess(
                response.data
            )
        );
    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEditACAMessageTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}
function* editACAMessageTemplateSaga() {
    yield all([takeLatest(editACAMessageTemplateTypes.FETCH_EDITACAMESSAGETEMPLATE_REQUEST, fetchEditACAMessageTemplateSaga)]);
}

export default editACAMessageTemplateSaga;