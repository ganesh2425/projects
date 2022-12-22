import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type reportState = {
  "employer":'',
  "employee":'',
  "date":''
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getDailyProductivityReportDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/${payload.type}/report/productivity/${payload.contentType}`, 
      data: { employerId: payload.employerId,userId:payload.userId,date:payload.date},
    })
  }
   catch (error) {
    throw error;
  }
};

  