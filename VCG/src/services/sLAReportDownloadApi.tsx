import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type sLAReportState = {
  "employer":'',
  "employee":'',
  "startDate":'',
  "endDate":''
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getSLAReportDownloadDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/${payload.type}/report/sla/${payload.contentType}`, 
      data : payload,
      responseType:"blob"
      // data: { employerId: payload.employer,userId:payload.employee,date:`04/10/2022`},
    })
  }
   catch (error) {
    throw error;
  }
};

  