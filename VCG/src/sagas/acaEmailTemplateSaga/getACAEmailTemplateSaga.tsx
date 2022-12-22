import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetACAEmailTemplateFailure,
    fetchGetACAEmailTemplateSuccess
} from "../../actions/acaEmailTemplateActions/getACAEmailTemplateActions";
import { getACAEmailTemplateTypes } from '../../constants/actionTypes';
import { getACAEmailTempById } from "../../services/acaEmailTemplateApi";

function* fetchGetACAEmailTemplateSaga({ payload }: any): any {
    try {
       
        const response = yield call(getACAEmailTempById, payload);
       
        yield put(
            fetchGetACAEmailTemplateSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetACAEmailTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getACAEmailTemplateSaga() {
    yield all([takeLatest(getACAEmailTemplateTypes.FETCH_GETACAEMAILTEMPLATE_REQUEST, fetchGetACAEmailTemplateSaga)]);
}

export default getACAEmailTemplateSaga;