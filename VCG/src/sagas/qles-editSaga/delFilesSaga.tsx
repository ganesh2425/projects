import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchFilesDeleteFailure,
    fetchFilesDeleteSuccess
} from "../../actions/qle-editActions/deleteFilesActions";
import {filesDeleteTypes} from '../../constants/actionTypes';
import {getDeleteDeatails} from "../../services/filesApi";

function* fetchFilesDeleteSaga({payload}: any): any {
    try {
        const response = yield call(getDeleteDeatails, payload);
        if (response.data) {                 
            yield put(
                fetchFilesDeleteSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    }catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchFilesDeleteFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* filesDeleteSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(filesDeleteTypes.FETCH_DELETEFILES_REQUEST, fetchFilesDeleteSaga)]);
}

export default filesDeleteSaga;