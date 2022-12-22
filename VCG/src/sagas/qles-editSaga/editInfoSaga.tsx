import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditFailure,
    fetchEditSuccess
} from "../../actions/qle-editActions/edit-infoActions"
import {editInfoTypes} from '../../constants/actionTypes';
import {editQleEventById} from "../../services/qleApi";

function* fetchEditSaga({payload}: any): any {console.log("qleapi");console.log(payload)
    try {
        const response = yield call(editQleEventById,payload);          
            yield put(
                fetchEditSuccess(
                    response.data
                )
            );
         
       
    }catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchEditFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* editInfoSaga() {
    yield all([takeLatest(editInfoTypes.FETCH_EDIT_REQUEST, fetchEditSaga)]);
}

export default editInfoSaga;

