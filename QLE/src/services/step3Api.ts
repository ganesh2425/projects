import axios from "axios";
import { type } from "os";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type STEP3State ={
  "fileName": "",
  "Name":"",
  "Name1":"",
  "eventId": 0,
  "formData": any,
}
export const getAddSTEP3Details = (payload: STEP3State):any => {
  const employerId = StorageService.getCookies("employerId");
  
  return axios({
    method: "post",
    headers: {
      // Accept: "multipart/form-data",
      "Content-Type": "multipart/form-data",
    },
    // url: BASE_URL + "/qleform/step3",
    url: BASE_URL + `/qleform/${employerId}/step3`,
    // data: {
    //   // accessToken: payload.accessToken,
    //     fileName:payload.fileName,
    //     file:payload.file,
    //     eventId:payload.eventId
      
    // },
    data: payload.formData
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
export const getSTEP3DetailsByEventId = (payload: any) => {
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

export const getEditStep3Details = (payload: any): any => {
  const employerId = StorageService.getCookies("employerId");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //url: `${BASE_URL}/qleform/step1`,
      url: BASE_URL +  `/qleform/${employerId}/step3`,
      data: {eventId: payload.eventId,
        fileName:payload.fileName,
        file:payload.file,
        confirmationNumber:payload.confirmationNumber,},
    });
  } catch (error) {
    throw error;
  }
};