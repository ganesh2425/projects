import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchEditUserProfileFailure,
    fetchEditUserProfileSuccess
} from "../../actions/userProfile/editUserProfile";
import {editUserProfileTypes} from '../../constants/actionTypes';
import {getEditUserProfileDetails} from "../../services/userProfileApi";

function* fetchEditUserProfileSaga({payload}: any): any {
    try {
        const response = yield call(getEditUserProfileDetails, payload)     
            yield put(
                fetchEditUserProfileSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchEditUserProfileFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* editUserProfileSaga() {
    yield all([takeLatest(editUserProfileTypes.FETCH_EDITUSERPROFILE_REQUEST, fetchEditUserProfileSaga)]);
}

export default editUserProfileSaga;