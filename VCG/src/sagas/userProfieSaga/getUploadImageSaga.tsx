import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetUploadImageFailure,
    fetchGetUploadImageSuccess
} from "../../actions/userProfile/getUploadImageActions";
import { getUploadImageTypes } from '../../constants/actionTypes';
import { getUserImage } from "../../services/userProfileApi";

function* fetchGetUploadImageSaga({ payload }: any): any {
    try {
       
        const response = yield call(getUserImage, payload);
        yield put(
            fetchGetUploadImageSuccess(
                response.data
            )
        );
    } catch (e: any) {
        yield put(
            fetchGetUploadImageFailure({
                error: 'Unauthorized',
                message: e.message
            })
        );
    }
}

function* getUploadImageSaga() {
    yield all([takeLatest(getUploadImageTypes.FETCH_GET_UPLOADIMAGE_REQUEST, fetchGetUploadImageSaga)]);
}

export default getUploadImageSaga;