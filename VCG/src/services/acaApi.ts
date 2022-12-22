import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

export const getAllACADetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
     
  try {

    return axios({
      method: "get",
      headers: headers,
      url: BASE_URL + `/acaevent/${payload.empId}/${payload.statusId}/acalist`,
    });
  } catch (error) {
    throw error;
  }
};

  export const getACAEventId = (payload: any): any =>{
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + `/acaevent/${payload.id}/getEventData`,
      });
    } catch (error) {
      throw error;
    }
  }

  export const getEditACAInfoDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    const acaEventId = StorageService.getCookies("eventId")
    try {
      return axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/startMyAca`,
        data: {
          firstName: payload.firstName, middleName: payload.middleName, lastName: payload.lastName, suffix: payload.suffix, dob: payload.dob, ssn: payload.ssn,
          address: payload.address, city: payload.city, zip: payload.zip, dependent1: payload.dependent1,
          dependent2: payload.dependent2, dependent3: payload.dependent3, dependent4: payload.dependent4, preferredContactMethod: payload.preferredContactMethod,
          healthCoverageInfo: payload.healthCoverageInfo, empOpenEnrollmentState: payload.empOpenEnrollmentState, status: payload.status, stateId: payload.stateId
        }
      });
    } catch (error) {
      throw error;
    }
  };

  export const deleteACAInfoDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.eventId}`,
      });
    } catch (error) {
      throw error;
    }
  };
 
  export const getACAEmployerId = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/employer`,
      });
    } catch (error) {
      throw error;
    }
  };

  //addNote

  export const getAddNoteDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/addnote`,
        data: {note:payload.note },
      });
    } catch (error) {
      throw error;
    }
  };
   
  //add Email && Phone Log
  export const getAddEmailDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/addCommunicationRecord`,
        data: {communicationString: payload.communicationString,communicationThrough:payload.communicationThrough },
      });
    } catch (error) {
      throw error;
    }
  };

  //employerACAEdit 
  export const employerACAEdit = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/employer`,
        data: {employerId: payload.employerId,employerSignature:payload.employerSignature },
      });
    } catch (error) {
      throw error;
    }
  }

  //healthPlan
  export const healthPlanDetails =(payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + `/acaevent/${payload.id}/healthPlan`,
        data: {mecMcCoverage: payload.mecMcCoverage,dependentEligiblity:payload.dependentEligiblity },
      });
    } catch (error) {
      throw error;
    }
  }

  //newYearPlan
  export const newYearPlan =(payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + `/acaevent/${payload.id}/planChanges`,
        data: {plan1EmployerOfferCoverage: payload.plan1EmployerOfferCoverage, plan1EmployeeHavetoPay:payload.plan1EmployeeHavetoPay, plan1HowOften: payload.plan1HowOften,
          plan1EffectiveDate: payload.plan1EffectiveDate, plan2EmployerOfferCoverage: payload.plan2EmployerOfferCoverage, plan2EmployeeHavetoPay: payload.plan2EmployeeHavetoPay,
          plan2HowOften: payload.plan2HowOften, plan2EffectiveDate: payload.plan2EffectiveDate },
      });
    } catch (error) {
      throw error;
    }
  }

  export const editHealthDetails =(payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + `/acaevent/${payload.id}/healthPlan`,
        data: {healthPlanId: payload.healthPlanId, mecMcCoverage: payload.mecMcCoverage,dependentEligiblity:payload.dependentEligiblity, employerSignature: payload.employerSignature },
      });
    } catch (error) {
      throw error;
    }
  }
  export const eligibleDetails =(payload: any): any =>{
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "put",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + `/acaevent/${payload.id}/eligibility`,
        data: {employeePremium: payload.employeePremium, premiumFrequency: payload.premiumFrequency,
          isEmployeeElgbleOrNext3Months: payload.isEmployeeElgbleOrNext3Months, employeeElgbleOrNext3MonthsDate: payload.employeeElgbleOrNext3MonthsDate}
      });
    } catch (error) {
      throw error;
    }
  }

  

 



