import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";

export const getFAQDetails = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    //url: BASE_URL + "/qleform/faq",
    url: BASE_URL +  `/acaform/${employerId}/faq`,
    data: { accessToken: payload.accessToken, faq: payload.faq},
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
