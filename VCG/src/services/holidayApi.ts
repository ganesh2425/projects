import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getDownloadHolidayTemp = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/employer/${payload.id}/${payload.year}/download`,
        responseType:'blob'
      });
    } catch (error) {
      throw error;
    }
  };

export const getHolidayDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/employer/${payload.id}/${payload.year}/holidays`,
        // url: `${BASE_URL}/employer/${payload.id}/2022/holidays`,
        
      });
    } catch (error) {
      console.log(error,"[[[[")
      throw error;
    }
};


export const uploadHolidayDetails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    return axios ({
      method:"post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/employer/${payload.id}/${payload.year}/holiday`,
      data: payload.formData
    })
    .then((response: any) => {
      return response;
    })
    .catch((reason: any) => {
      if (reason["message"] === "Network Error") {
        throw reason["message"];
      } else {
        return reason;
      }
    });
      
}
  