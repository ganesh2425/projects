import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetACADownloadFailure,
    fetchGetACADownloadSuccess
} from "../../actions/acaPreviewAction/acaDownloadActions";
import { getACADownloadTypes } from '../../constants/actionTypes';
import { getACADownload } from "../../services/acaPreviewApi";

function* fetchGetACADownloadSaga({ payload }: any): any {
    try {
       
        const response = yield call(getACADownload, payload);
        yield put(
            fetchGetACADownloadSuccess(
                response.data
            )
        );


    } catch (e: any) {
        // toast.error("Please Contact Administrator !!!!!!");
        yield put(
            fetchGetACADownloadFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getACADownloadSaga() {
    yield all([takeLatest(getACADownloadTypes.FETCH_GET_ACA_DOWNLOAD_REQUEST, fetchGetACADownloadSaga)]);
}

export default getACADownloadSaga;