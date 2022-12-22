import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetACAPreviewFailure,
    fetchGetACAPreviewSuccess
} from "../../actions/acaPreviewAction/acaPreviewActions";
import { getACAPreviewTypes } from '../../constants/actionTypes';
import { getACAPreview } from "../../services/acaPreviewApi";

function* fetchGetACAPreviewSaga({ payload }: any): any {
    try {
        const response = yield call(getACAPreview, payload);
        yield put(
            fetchGetACAPreviewSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetACAPreviewFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getACAPreviewSaga() {
    yield all([takeLatest(getACAPreviewTypes.FETCH_GET_ACA_PREVIEW_REQUEST, fetchGetACAPreviewSaga)]);
}

export default getACAPreviewSaga;