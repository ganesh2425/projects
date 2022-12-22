import axios from "axios";
import { type } from "os";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type STEP3State ={
  "fileName": "",
  "Name":"",
  "eventId": 0,
}
export const viewFileDetails = (payload: STEP3State):any => {
  const employerId = StorageService.getCookies("employerId");
  
  return axios({
    method: "get",
    url: BASE_URL + "/qleform/view",
    // url: BASE_URL + `/qleform/${employerId}/step3`,
    data: {
      // accessToken: payload.accessToken,
        fileName:payload.fileName,
        // file:payload.file,
        eventId:payload.eventId
      
    },
    // data: payload.formData
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