import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchFilesViewFailure,
    fetchFilesViewSuccess
} from "../../actions/qle-editActions/viewFilesAction";
import {filesViewTypes} from '../../constants/actionTypes';
import {getViewDeatails} from "../../services/filesApi";

function* fetchFilesViewSaga({payload}: any): any {
    try {
        const response = yield call(getViewDeatails, payload);
    
        
        if (response.data) {                 
            yield put(
                fetchFilesViewSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchFilesViewFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* filesViewSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(filesViewTypes.FETCH_FILESVIEW_REQUEST, fetchFilesViewSaga)]);
}

export default filesViewSaga;