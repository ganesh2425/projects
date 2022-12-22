import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type addEmployerState = {
  "name": "",
  "url": '',
  "ein": '',
  "address": '',
  "city": '',
  "state": '',
  "zipCode": 0,
  "phoneNo": '',
  "phoneType": "",
  "qleHomePageDescription": '',
  "status": "",
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getAddEmployerDetails = (payload: addEmployerState): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/employer",
      data: { name: payload.name, url: payload.url, ein: payload.ein, address: payload.address, city: payload.city, state: payload.state, zipCode: payload.zipCode, phoneNo: payload.phoneNo, qleHomePageDescription: payload.qleHomePageDescription, status: payload.status, phoneType: payload.phoneType },
    });
  } catch (error) {
    throw error;
  }
};

export const getEmployerById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getAllEmployerDetails = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/employer/getAll",
    });
  } catch (error) {
    throw error;
  }
};

export const getEditEmployerDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/${payload.id}`,
      data: { name: payload.name, url: payload.url, ein: payload.ein, address: payload.address, city: payload.city, state: payload.state, zipCode: payload.zipCode, phoneNo: payload.phoneNo, qleHomePageDescription: payload.qleHomePageDescription, status: payload.status, phoneType: payload.phoneType },
    });
  } catch (error) {
    throw error;
  }
};

export const delEmployerDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getStates = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/state/getAll`
    });
  } catch (error) {
    throw error;
  }
};

//Employers_QLE_Step APIs

export const getEmpDetailsForCreate = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/employer/create",
    });
  } catch (error) {
    throw error;
  }
};

export const updateEmployerQLEStepsEvent = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/${payload.id}/events`,
      data:  payload,
    });
  } catch (error) {
    throw error;
  }
};

export const updateEmployerQLESteps = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  let dataPayload: string = "";
  const bodyFormData = new FormData();
  if (payload.qleHomePageDescription) {
    dataPayload = dataPayload + '"' + 'qleHomePageDescription' + '"' + ':"' + payload.qleHomePageDescription + '"';
  }
  else if (payload.qleContactCertDescriptionStep1 && payload.qleCertDescriptionStep1 && payload.qleDisclaimerStep1) {
    dataPayload = '"' + "qleContactCertDescriptionStep1" + '"' + ':"' + payload.qleContactCertDescriptionStep1 + '"'
      + ',' + '"' + "qleCertDescriptionStep1" + '"' + ':"' + payload.qleCertDescriptionStep1 + '"'
      + ',' + '"' + "qleDisclaimerStep1" + '"' + ':"' + payload.qleDisclaimerStep1 + '"'
      ;
  }
  else if (payload.qleWhatBenefitChangesStep2 && payload.qleWhoChangedBenefitStep2 && payload.qleDisclaimerStep2) {
    dataPayload = '"' + "qleWhatBenefitChangesStep2" + '"' + ':"' + payload.qleWhatBenefitChangesStep2 + '"'
      + ',' + '"' + "qleWhoChangedBenefitStep2" + '"' + ':"' + payload.qleWhoChangedBenefitStep2 + '"'
      + ',' + '"' + "qleDisclaimerStep2" + '"' + ':"' + payload.qleDisclaimerStep2 + '"'
      ;
  }
  else if (payload.qleDocumentCoveredStep3 && payload.qleImportantNoteStep3) {
    dataPayload = '"' + "qleDocumentCoveredStep3" + '"' + ':"' + payload.qleDocumentCoveredStep3 + '"'
      + ',' + '"' + "qleImportantNoteStep3" + '"' + ':"' + payload.qleImportantNoteStep3 + '"'
      ;
  }
  else if (payload.qlePrivacyPolicy) {
    dataPayload = '"' + "qlePrivacyPolicy" + '"' + ':"' + payload.qlePrivacyPolicy + '"'
      ;
  }
  else if (payload.acaHomepageDescription) {
    dataPayload = dataPayload + '"' + 'acaHomepageDescription' + '"' + ':"' + payload.acaHomepageDescription + '"';
  }
  else if (payload.acaPrivacyPolicy) {
    dataPayload = '"' + "acaPrivacyPolicy" + '"' + ':"' + payload.acaPrivacyPolicy + '"'
      ;
  }
  else if (payload.acaPrimaryContactName && payload.acaPrimaryContactEmail && payload.acaPrimaryContactPhoneNo && payload.acaPrimaryContactPhoneType) {
    dataPayload = '"' + "acaPrimaryContactName" + '"' + ':"' + payload.acaPrimaryContactName +
     '"' + ',' + '"' + "acaPrimaryContactEmail" + '"' + ':"' + payload.acaPrimaryContactEmail +
     '"' + ',' + '"' + "acaPrimaryContactPhoneNo" + '"' + ':"' + payload.acaPrimaryContactPhoneNo +
     '"' + ',' + '"' + "acaPrimaryContactPhoneType" + '"' + ':"' + payload.acaPrimaryContactPhoneType + '"'
     ;
  }

  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/qle/${payload.id}`,
      // data: { 
      //   qleHomePageDescription: payload.qleHomePageDescription},
      //data: JSON.parse('{'+ dataPayload +'}'),

      data: payload.qlePlan || payload.qleEventTypes || payload.qleEnabled || !payload.qleEnabled
      ? payload : JSON.parse('{' + dataPayload + '}'),
    });
  } catch (error) {
    throw error;
  }
};

//newyear plan
export const getNewYearPlan = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL +`/employer/aca/${payload.id}`,
      data:{
        newYearChangesOneEmployerOffer:payload.newYearChangesOneEmployerOffer,
        newYearChangeOneEmployeePay:payload.newYearChangeOneEmployeePay,
        newYearChaneOneOften:payload.newYearChaneOneOften,
        newYearChangeOneEffectiveDate:payload.newYearChangeOneEffectiveDate,
        newYearChangesTwoEmployerOffer:payload.newYearChangesTwoEmployerOffer,
        newYearChangeTwoEmployeePay:payload.newYearChangeTwoEmployeePay,
        newYearChaneTwoOften:payload.newYearChaneTwoOften,
        newYearChangeTwoEffectiveDate:payload.newYearChangeTwoEffectiveDate,},
    });
  } catch (error) {
    throw error;
  }
};

export const getHealthPlan = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL +`/employer/aca/${payload.id}`, 
      data:{mec:payload.mec,healthPlanCover:payload.healthPlanCover,employerSignature:payload.employerSignature,
        employeePremium:payload.employeePremium,
        employeePremiumOften:payload.employeePremiumOften,
        nextThreeMonths:payload.nextThreeMonths},
      });
  } catch (error) {
    throw error;
  }
};


export const getAllEmployerByTypeDetails = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/employer/getAll/${payload.type}`,
    });
  } catch (error) {
    throw error;
  }
};