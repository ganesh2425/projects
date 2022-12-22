import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchFilesFailure,
    fetchFilesSuccess
} from "../../actions/qle-editActions/filesActions";
import {filesTypes} from '../../constants/actionTypes';
import {AddFilesDetails} from "../../services/filesApi"

function* fetchFilesSaga({payload}: any): any {console.log("Saga->>checking");
    try {
        const response = yield call(AddFilesDetails, payload);
        console.log(response);
        if (response.data) {                 
            yield put(
                fetchFilesSuccess(
                    response.data
                )
            );
          } else {
            throw response;
          }
       
    }catch (e:any) {console.log(e)
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchFilesFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* filesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(filesTypes.FETCH_FILES_REQUEST, fetchFilesSaga)]);
}

export default filesSaga;