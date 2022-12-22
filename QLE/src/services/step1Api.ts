import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
// import StorageService from "./Storage.service";
// const token = StorageService.getCookies("accessToken");
import StorageService from "./Storage.service";

export const getAddSTEP1Details = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "post",
    //url: BASE_URL + "/qleform/step1",
    url: BASE_URL +  `/qleform/${employerId}/step1`,
    data: {
      accessToken: payload.accessToken,
      firstName: payload.firstName,
      middleName: payload.middleName,
      lastName: payload.lastName,
      ssn: payload.ssn,
      email: payload.email,
      phoneNo: payload.phoneNo,
      eventTypeId: payload.eventTypeId,
      eventSubTypeId: payload.eventSubTypeId,
      evntDate: payload.evntDate,
      remViaTxt: payload.remViaTxt,
      otp:payload.otp,
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

export const getSTEP1DetailsByEventId = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "get",
    //url: `${BASE_URL}/qleform/${payload.token}`,
    url: BASE_URL +  `/qleform/${payload.token}`,
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

export const getEditStep1Details = (payload: any): any => {
  const employerId = StorageService.getCookies("employerId");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //url: `${BASE_URL}/qleform/step1`,
      url: BASE_URL +  `/qleform/${employerId}/step1`,
      data: {eventId: payload.eventId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        middleName: payload.middleName,
        ssn: payload.ssn,
        evntDate: payload.evntDate,
        eventTypeId: payload.eventTypeId,
        remViaTxt: payload.remViaTxt,
        email: payload.email,
        phoneNo: payload.phoneNo,
        eventSubTypeId: payload.eventSubTypeId,
        confirmationNumber:payload.confirmationNumber,
        otp:payload.otp
      },
    });
  } catch (error) {
    throw error;
  }
};
