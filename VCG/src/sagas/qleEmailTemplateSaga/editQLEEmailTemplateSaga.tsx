import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditQLEEmailTemplateFailure,
    fetchEditQLEEmailTemplateSuccess
} from "../../actions/qleEmailTemplateActions/editQLEEmailTemplateActions";
import {editQLEEmailTemplateTypes} from '../../constants/actionTypes';
import {getEditQLEEmailTempDetails} from "../../services/qleEmailTemplateApi";

function* fetchEditQLEEmailTemplateSaga({payload}: any): any {
    try {
        const response = yield call(getEditQLEEmailTempDetails, payload);     
            yield put(
                fetchEditQLEEmailTemplateSuccess(
                    response.data
                )
            );
            
        } catch (e:any) {
            // toast.error("Please Contact Administrator !!!!!!");
            yield put(
                fetchEditQLEEmailTemplateFailure({
                    error: 'Unauthorized',
                    message:e.message
                })
            );
        }
    }

function* editQLEEmailTemplateSaga() {
    yield all([takeLatest(editQLEEmailTemplateTypes.FETCH_EDITQLEEMAILTEMPLATE_REQUEST, fetchEditQLEEmailTemplateSaga)]);
}

export default editQLEEmailTemplateSaga;