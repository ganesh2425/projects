import { GetStep1Actions, GetStep1State} from "../interfaces/types";
import {getStep1Types} from "../constants/actionTypes";
import {RootState} from "./index";

const initialState: GetStep1State = {
    pending: false,
    error: null,
    eventId: 0,
    confirmationNumber: '',
    firstName:  '',
    middleName:  '',
    lastName:  '',
    name: '',
    email:  '',
    phoneNo:  '',
    otp:'',
    ssn:  '',
    eventTypeId:  '',
    eventSubTypeId:  '',
    evntDate:  '',
    remViaTxt:  '',
    accessibleBenefits: [],
    qleWhatBenefitChangesStep2:  '',
    qleWhoChangedBenefitStep2: '',
    qleDisclaimerStep2:  '',
    step1QleCertificationBox: '',
    step1QleContactBox: '',
    step1QleDisclaimer: '',
    step:0,
    eventType:'',
    eventSubType:'',
    step3ImportantNote:'',
    step3DocumentCovered:'',
    documents:[],
    token:'',
    // enrollOrChange: 0,
    enrollOrCancel: 1,
    dependentOption:1,
    optionalMedFsa: "",
    optionalAllTierMedHsa: "",
    optionalEmpOnlyHsa: "",
    dependentAnnualFsa: "",
    cancelHealthFsa:"",
    cancelAllHealthCoverHsa: "",
    cancelEmpHealthCoverHsa: "",
    cancelDependentFsa: "",
    optMedAmount:"",

    benefitDetails:{
        medPlanId:  "",
        medPlanName:  "",
        comments:  "",
        medCoverageTier:  "",
        optMedFsa:  "",
        optMedHsa:  "",
        dentPlanId:  "",
        dentPlanName:  "",
        dentCoverageTier: "",
        visionPlanId:  "",
        visionPlanName:  "",
        visionCoverageTier:  "",
        annualFsa:  "",
        dependentFsa: "",
        dependentSet: [],

        //cancel related
        cancelMedical: false,
        cancelVision: false,
        cancelDental: false,
        cancelDependentFsa: false,
        cancelEmployee: false,
        cancelSpouse: false,
        cancelDomesticPartner: false,
        employee: "",
        spouse: "",
        domesticPartner: "",
        cancelChild: false,
        child: [],
        cancelSpouseChild: false,
        cancelDomesticPartnerChild: false,
        cancelHealthAnnualFsa: "",
        cancelCoverHealthAnnualHsa: "",
        cancelEmployeeHsa:"",
        cancelDependentAnnualFsa:"",
        domesticPartnersChild: [],
        },
    commenterName: "",
    //status for last step completion
    status: "",
};

export default (state = initialState, action: GetStep1Actions) => {
    switch (action.type) {
        case getStep1Types.FETCH_GETSTEP1_REQUEST:
            return {
                ...state,
                pending: true
            };
        case getStep1Types.FETCH_GETSTEP1_SUCCESS:
            return {
                ...state,
                pending: false,
                ...action.payload,
                data: action.payload,
                error: null,
            };
        case getStep1Types.FETCH_GETSTEP1_FAILURE:
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
export const getStep1Details = (state: RootState) => state.getStep1;