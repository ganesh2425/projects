import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

export const getCommunicationDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try { console.log("API");console.log(payload)
    return axios({
      method: "get",
      headers: headers,
      url: BASE_URL +  `/qleevent/comms/${payload.id}`, 
    });
  } catch (error) {
    throw error;
  }
};
  
