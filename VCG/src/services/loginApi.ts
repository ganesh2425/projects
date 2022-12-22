import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type loginState = {
  username: "";
  password: "";
};

type ForgotPwdState = {
  email: "";
 
};

export const getAuthDetails = (payload: loginState): any => {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: BASE_URL + "/auth/signin",
      data: { username: payload.username, password: payload.password },
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

export const getForgotPwdDetails = (payload: ForgotPwdState): any => {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: BASE_URL + "/auth/forgot",
      data: {email:payload.email},
    })
    .then((response) => {
      return response;
    })
    .catch((reason: any) => {
      console.log(reason)
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
};