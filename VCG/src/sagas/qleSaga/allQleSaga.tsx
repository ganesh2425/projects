import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchAllQlesFailure,
    fetchAllQlesSuccess
} from "../../actions/qleActions/allQleActions"
import {allqlesTypes} from '../../constants/actionTypes';
import {getAllQLEsDetails} from "../../services/qleApi";

function* fetchAllQleSaga({payload}: any): any{
    try {
        const response = yield call(getAllQLEsDetails, payload);
              console.log("response--") ;console.log(response) 
            yield put(
                fetchAllQlesSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
            fetchAllQlesFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* allQleSaga() {
    yield all([takeLatest(allqlesTypes.FETCH_ALLQLES_REQUEST, fetchAllQleSaga)]);
}

export default allQleSaga;


