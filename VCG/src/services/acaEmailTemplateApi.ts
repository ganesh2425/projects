import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getEditACAEmailTempDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/aca/mail/${payload.id}`,
      data: { content:payload.content,subject:payload.subject}
    });

  } catch (error) {
   
    throw error;
  }
};
export const getEditACAMessageTempDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/aca/message/${payload.id}`,
      data: { content:payload.content,subject:payload.subject}
    });

  } catch (error) {

    throw error;
  }
};

export const getAllACAEmailTemplateDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const employerId = StorageService.getCookies("employerId");
  try {
    
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/template/aca/mail/${payload.id}/all`,
    });
  } catch (error) {
    throw error;
  }
};

export const getACAEmailTempById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/aca/mail/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getACAMessageTempById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/template/aca/message/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

