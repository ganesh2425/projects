import { AnyAaaaRecord } from "dns";
import { getStep3Types } from "../constants/actionTypes";
import {
    FetchGetStep3Failure,
    FetchPostsFailurePayload,
    FetchGetStep3Request,
    FetchGetStep3Success,
    GetStep3Response,
    FetchGetStep3SuccessPayload,
} from "../interfaces/types";

export const fetchGetStep3Request = (payload: any): FetchGetStep3Request => ({
    type: getStep3Types.FETCH_GETSTEP3_REQUEST,
    payload
});

export const fetchGetStep3Success = (
    payload: any
): FetchGetStep3Success => ({
    type: getStep3Types.FETCH_GETSTEP3_SUCCESS,
    payload
});

export const fetchGetStep3Failure = (
    payload: FetchPostsFailurePayload
): FetchGetStep3Failure => ({
    type: getStep3Types.FETCH_GETSTEP3_FAILURE,
    payload
});


