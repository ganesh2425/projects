import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("token");

type loginState = {
  email: "";
  mobile: "";
  isCaptchaVerified: 0;
};
export const getAuthDetails = (payload: loginState): any => {
  const employerId = StorageService.getCookies("employerId");
  try {  
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: BASE_URL + `/acaform/${employerId}/auth`,
      data: { email: payload.email, phoneNo: payload.mobile },
    });
  } catch (error) {
    throw error;
  }
};

 