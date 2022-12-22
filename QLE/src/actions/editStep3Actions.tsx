import { editStep3Types } from "../constants/actionTypes";
import {
    FetchEditStep3Failure,
    FetchPostsFailurePayload,
    FetchEditStep3Request,
    FetchEditStep3Success,
    EditStep3, 
    FetchEditStep3SuccessPayload,
} from "../interfaces/types";

export const fetchEditStep3Request = (payload: EditStep3): FetchEditStep3Request => ({
    type: editStep3Types.FETCH_EDITSTEP3_REQUEST,
    payload
});

// export const fetchAddStep3Success = (
//     payload: AuthResponse
// ): FetchAddStep3Success => ({
//     type: addStep3Types.FETCH_ADDStep3_SUCCESS,
//     payload
// });

export const fetchEditStep3Success = (
    payload: FetchEditStep3SuccessPayload
): FetchEditStep3Success => ({
    type: editStep3Types.FETCH_EDITSTEP3_SUCCESS,
    payload
});

export const fetchEditStep3Failure = (
    payload: FetchPostsFailurePayload
): FetchEditStep3Failure => ({
    type: editStep3Types.FETCH_EDITSTEP3_FAILURE,
    payload
});


