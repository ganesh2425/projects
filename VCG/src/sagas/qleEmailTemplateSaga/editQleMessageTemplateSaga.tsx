import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditQLEMessageTemplateFailure,
    fetchEditQLEMessageTemplateSuccess
} from "../../actions/qleEmailTemplateActions/editQLEMessageTemplateActions";
import {editQLEMessageTemplateTypes} from '../../constants/actionTypes';
import {getEditQLEMessageTempDetails} from "../../services/qleEmailTemplateApi";

function* fetchEditQLEMessageTemplateSaga({payload}: any): any {
    try {
        const response = yield call(getEditQLEMessageTempDetails, payload); 
            yield put(
                fetchEditQLEMessageTemplateSuccess(
                    response.data
                )
            );
         
       
        } catch (e:any) {
            // toast.error("Please Contact Administrator !!!!!!");
            yield put(
                fetchEditQLEMessageTemplateFailure({
                    error: 'Unauthorized',
                    message:e.message
                })
            );
        }
    }

function* editQLEMessageTemplateSaga() {
    yield all([takeLatest(editQLEMessageTemplateTypes.FETCH_EDITQLEMESSAGETEMPLATE_REQUEST, fetchEditQLEMessageTemplateSaga)]);
}

export default editQLEMessageTemplateSaga;