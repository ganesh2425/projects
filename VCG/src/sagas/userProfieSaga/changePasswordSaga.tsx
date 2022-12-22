import { toast } from 'react-toastify';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchChangeUserProfilePasswordFailure,
    fetchChangeUserProfilePasswordSuccess
} from "../../actions/userProfile/changePasswordActions";
import {changeUserProfilePasswordTypes} from '../../constants/actionTypes';
import {changeUserProfilePasswordDetails} from "../../services/userProfileApi";

function* fetchChangeUserProfilePasswordSaga({payload}: any): any {
    try {
        const response = yield call(changeUserProfilePasswordDetails, payload);    
            yield put(
                fetchChangeUserProfilePasswordSuccess(
                    response.data
                )
            );
         
       
    } catch (e:any) {
        // toast.error("Please Contact Administrator !!!!!!");
        let message = "";
        e === "Network Error" ? (message = e) : (message = e.message);
        yield put(
          fetchChangeUserProfilePasswordFailure({
            error: message,
            message:e.message
          })
        );
    }
}

function* ChangeUserProfilePasswordSaga() {
    yield all([takeLatest(changeUserProfilePasswordTypes.FETCH_CHANGEUSERPROFILE_REQUEST, fetchChangeUserProfilePasswordSaga)]);
}

export default ChangeUserProfilePasswordSaga;