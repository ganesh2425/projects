import { communicationTypes } from "../../constants/actionTypes";
import {
    FetchCommunicationFailure,
    FetchPostsFailurePayload,
    FetchCommunicationRequest,
    FetchCommunicationSuccess,
} from "../../interfaces/types";

export const fetchCommunicationRequest = (payload: any): FetchCommunicationRequest => ({
    type: communicationTypes.FETCH_COMMUNICATION_REQUEST,
    payload
});

export const fetchCommunicationSuccess = (
   payload: any
): FetchCommunicationSuccess => ({
    type: communicationTypes.FETCH_COMMUNICATION_SUCCESS,
    payload
});

export const fetchCommunicationFailure = (
   payload: FetchPostsFailurePayload
): FetchCommunicationFailure => ({
    type: communicationTypes.FETCH_COMMUNICATION_FAILURE,
    payload
});

