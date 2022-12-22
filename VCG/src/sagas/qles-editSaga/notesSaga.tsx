import { toast } from 'react-toastify';
import { all, call, put, takeLatest, ForkEffect, AllEffect } from 'redux-saga/effects';
import {
    fetchNotesFailure,
    fetchNotesSuccess
} from "../../actions/qle-editActions/notesActions";
import {notesTypes} from '../../constants/actionTypes';
import {getNotesDeatails} from "../../services/notesApi";

function* fetchNotesSaga({payload}: any): any {
    try {
        const response = yield call(getNotesDeatails, payload);
        if (response.data) {                 
            yield put(
                fetchNotesSuccess(
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
            fetchNotesFailure({
                error: message,
                message:e.message
            })
        );
    }
}

function* notesSaga(): Generator<AllEffect<ForkEffect<never>>, void, unknown> {
    yield all([takeLatest(notesTypes.FETCH_NOTES_REQUEST, fetchNotesSaga)]);
}

export default notesSaga;