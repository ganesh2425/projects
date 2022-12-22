import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("token");

type loginState = {
  email: "";
  eventTypeId: any;
  eventSubTypeId:any;
  isCaptchaVerified: 0;
  evntDate:""
};
export const getreAuthDetails = (payload: loginState): any => {
  const employerId = StorageService.getCookies("employerId");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: BASE_URL + `/qleform/${employerId}/resendlink`,
      data: { email: payload.email, eventTypeId: payload.eventTypeId, eventSubTypeId:payload.eventSubTypeId,evntDate:payload.evntDate},
    });
  } catch (error) {
    throw error;
  }
};

 