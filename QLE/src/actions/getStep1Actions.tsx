import { AnyAaaaRecord } from "dns";
import { getStep1Types } from "../constants/actionTypes";
import {
    FetchGetStep1Failure,
    FetchPostsFailurePayload,
    FetchGetStep1Request,
    FetchGetStep1Success,
    GetStep1Response,
    FetchGetStep1SuccessPayload,
} from "../interfaces/types";

export const fetchGetStep1Request = (payload: any): FetchGetStep1Request => ({
    type: getStep1Types.FETCH_GETSTEP1_REQUEST,
    payload
});

export const fetchGetStep1Success = (
    payload: any
): FetchGetStep1Success => ({
    type: getStep1Types.FETCH_GETSTEP1_SUCCESS,
    payload
});

export const fetchGetStep1Failure = (
    payload: FetchPostsFailurePayload
): FetchGetStep1Failure => ({
    type: getStep1Types.FETCH_GETSTEP1_FAILURE,
    payload
});


