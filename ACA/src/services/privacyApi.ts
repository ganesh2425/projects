import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";

export const getPRIVACYDetails = (payload: any) => {
  const employerId = StorageService.getCookies("employerId");
  return axios({
    method:"get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url: BASE_URL + `/acaform/${employerId}/privacy_policy`,
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
}