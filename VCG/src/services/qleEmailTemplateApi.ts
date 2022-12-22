
import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getEditQLEEmailTempDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/qle/mail/${payload.id}`,
      data: { content:payload.content,subject:payload.subject}
    });

  } catch (error) {
   
    throw error;
  }
};

export const getEditQLEMessageTempDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/qle/message/${payload.id}`,
      data: { content:payload.content,subject:payload.subject}
    });

  } catch (error) {
    console.log(error,)
    throw error;
  }
};

export const getAllQLEEmailTemplateDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const employerId = StorageService.getCookies("employerId");
  try {
    console.log(payload,"hi")
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/template/qle/mail/${payload.id}/all`,
      
    });
  } catch (error) {
    throw error;
  }
};

export const getQLEEmailTempById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/qle/mail/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getQLEMessageTempById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/qle/message/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};


