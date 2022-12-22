import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchUploadImageFailure,
    fetchUploadImageSuccess
} from "../../actions/userProfile/uploadImageActions";
import {uploadImageTypes} from '../../constants/actionTypes';
import {AddUploadImageDetails} from "../../services/userProfileApi"

function* fetchUploadImageSaga({payload}: any): any {console.log("Saga->>checking");
  try {
      const response = yield call(AddUploadImageDetails, payload);
      yield put(
                fetchUploadImageSuccess(
                    response.data
                )
            );
    }catch (e:any) {
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchUploadImageFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* uploadImageSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
  yield all([takeLatest(uploadImageTypes.FETCH_UPLOADIMAGE_REQUEST, fetchUploadImageSaga)]);
}

export default uploadImageSaga;