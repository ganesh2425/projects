import { DashboardActions, DashboardState } from '../interfaces/types';
import {dashboardTypes} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: DashboardState = {
    pending: false,
    error: null,
    qleInitiated: 0,
    qlePendingReview: 0,
    qleAdditionalInfoRequired: 0,
    qleApprovedOrPending: 0,
    qleChangesCompleted: 0,
    qleDenied: 0,
    qleDuplicate: 0,
    qleArchived: 0,
    acaNew: 0,
    acaAdditionalInfoRequired: 0,
    acaRevisit: 0,
    acaCompleted: 0,
    acaCancelled: 0,
    acaArchived: 0,
    data: {},
    response:{},
};

export default (state = initialState, action: DashboardActions) => {
    switch (action.type) {
        case dashboardTypes.FETCH_DASHBOARD_REQUEST:
            return {
                ...state,
                pending: true
            };
        case dashboardTypes.FETCH_DASHBOARD_SUCCESS:
            return {
                ...state,
                pending: false,
                data:action.payload,
                error: null
            };
        case dashboardTypes.FETCH_DASHBOARD_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getDashboardDetails = (state: RootState) => state.dashboard.data;