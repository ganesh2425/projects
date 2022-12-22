import { editStep1Types } from "../constants/actionTypes";
import {
    FetchEditStep1Failure,
    FetchPostsFailurePayload,
    FetchEditStep1Request,
    FetchEditStep1Success,
    EditStep1, 
    FetchEditStep1SuccessPayload,
} from "../interfaces/types";

export const fetchEditStep1Request = (payload: EditStep1): FetchEditStep1Request => ({
    type: editStep1Types.FETCH_EDITSTEP1_REQUEST,
    payload
});

// export const fetchAddStep1Success = (
//     payload: AuthResponse
// ): FetchAddStep1Success => ({
//     type: addStep1Types.FETCH_ADDStep1_SUCCESS,
//     payload
// });

export const fetchEditStep1Success = (
    payload: FetchEditStep1SuccessPayload
): FetchEditStep1Success => ({
    type: editStep1Types.FETCH_EDITSTEP1_SUCCESS,
    payload
});

export const fetchEditStep1Failure = (
    payload: FetchPostsFailurePayload
): FetchEditStep1Failure => ({
    type: editStep1Types.FETCH_EDITSTEP1_FAILURE,
    payload
});


