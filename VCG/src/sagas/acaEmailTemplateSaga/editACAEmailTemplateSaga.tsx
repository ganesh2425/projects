import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditACAEmailTemplateFailure,
    fetchEditACAEmailTemplateSuccess
} from "../../actions/acaEmailTemplateActions/editACAEmailTemplateActions";
import { editACAEmailTemplateTypes } from '../../constants/actionTypes';
import { getEditACAEmailTempDetails } from "../../services/acaEmailTemplateApi";

function* fetchEditACAEmailTemplateSaga({ payload }: any): any {
    try {
        const response = yield call(getEditACAEmailTempDetails, payload);
      

        yield put(
            fetchEditACAEmailTemplateSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchEditACAEmailTemplateFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}
function* editACAEmailTemplateSaga() {
    yield all([takeLatest(editACAEmailTemplateTypes.FETCH_EDITACAEMAILTEMPLATE_REQUEST, fetchEditACAEmailTemplateSaga)]);
}

export default editACAEmailTemplateSaga;