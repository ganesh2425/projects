import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchGetEditByIdFailure,
    fetchGetEditByIdSuccess
} from "../../actions/qle-editActions/getEditByIdActions"
import {getEditByIdTypes} from '../../constants/actionTypes';
import {getEditById} from "../../services/qleApi";

function* fetchGetEditByIdoSaga({payload}: any): any {
    try {
        const response = yield call(getEditById,payload);          
            yield put(
                fetchGetEditByIdSuccess(
                    response.data
                )
            );
         
       
    }catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchGetEditByIdFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* getEditByIdSaga() {
    yield all([takeLatest(getEditByIdTypes.FETCH_GETEDITBYID_REQUEST, fetchGetEditByIdoSaga)]);
}

export default getEditByIdSaga;

