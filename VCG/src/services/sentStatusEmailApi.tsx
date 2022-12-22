import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";

//sent status mail
export const getSentStatusMailDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      return axios({
        method: "post",
        headers: headers,
        url: BASE_URL + `/qleevent/sendemail`, 
        data:{eventId:payload.eventId,eventStatus:payload.eventStatus,emailSubject:payload.emailSubject,emailContent:payload.emailContent,},
      });
    } catch (error) {
      throw error;
    }
  }