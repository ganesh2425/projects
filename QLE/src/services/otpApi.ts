import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";

export const getOTPDetails = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //url: BASE_URL + "/qleform/verify",
    url: BASE_URL +  `/qleform/${employerId}/verify`,
    data: { accessToken: payload.accessToken, otp: payload.otp },
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

export const getResendOTPDetails = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //url: BASE_URL + "/qleform/verify",
    url: BASE_URL +  `/qleform/${employerId}/resendotp`,
    data: { accessToken: payload },
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