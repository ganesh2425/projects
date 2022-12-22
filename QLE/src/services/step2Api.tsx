import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const empId = StorageService.getCookies("accessToken");

export const getAddSTEP2Details = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "post",
    // url: BASE_URL + "/qleform/step2",
    url: BASE_URL + `/qleform/step2`,
    data: {
      confirmationNumber: payload.confirmationNumber,
      medPlanId: payload.medPlanId,
      medCoverageTier: payload.medCoverageTier,
      optMedFsa: payload.optMedFsa,
      optMedHsa: payload.optMedHsa,
      dentPlanId: payload.dentPlanId,
      dentCoverageTier: payload.dentCoverageTier,
      visionPlanId: payload.visionPlanId,
      visionCoverageTier: payload.visionCoverageTier,
      dependentFsa: payload.dependentFsa,
      commenterName: payload.commenterName,
      comments: payload.comments,
      eventId:payload.eventId,
      dependentSet: payload.dependentSet,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};

export const getPlansByEmployerId = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //url: BASE_URL + "/qleform/events",
    url: BASE_URL +  `/qleform/${employerId}/plans`,
    data: { accessToken: payload.accessToken, name: payload.name},
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};

//cancel apis
export const getAddSTEP2CancelDetails = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url: BASE_URL + `/qleform/${employerId}/cancelorchange`,
    data: {
      eventId: payload.eventId,
      cancelMedical: payload.cancelMedical,
      cancelHealthAnnualFsa: payload.cancelHealthAnnualFsa,
      cancelCoverHealthAnnualHsa: payload.cancelCoverHealthAnnualHsa,
      cancelEmployeeHsa: payload.cancelEmployeeHsa,
      cancelDental: payload.cancelDental,
      cancelVision: payload.cancelVision,
      cancelDependentFsa: payload.cancelDependentFsa,
      cancelDependentAnnualFsa: payload.cancelDependentAnnualFsa,
      cancelSpouse: payload.cancelSpouse,
      cancelEmployee: payload.cancelEmployee,
      cancelDomesticPartner: payload.cancelDomesticPartner,
      spouse: payload.spouse,
      employee: payload.employee,
      domesticPartner: payload.domesticPartner,
      cancelChild: payload.cancelChild,
      child: payload.child,
      cancelSpouseChild:payload.cancelSpouseChild,
      cancelDomesticPartnerChild: payload.cancelDomesticPartnerChild,
      domesticPartnersChild: payload.domesticPartnersChild,
      comments: payload.comments,
      commenterName: payload.commenterName,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};