import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";

export const getEmployerBySlug = (payload: any) => {
//   const employerSlug = StorageService.getCookies("employerName");
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    url: BASE_URL +  `/searchemployer/slug/${payload.employerName}`,
    // data: { accessToken: payload.accessToken, faq: payload.faq},
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
