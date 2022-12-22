import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};




export const getACAPreview = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/view/pdf`,
        responseType:'blob'
  
      });
    } catch (error) {
      throw error;
    }
  };

  //ACA Download

  export const getACADownload = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/download/pdf`,
        responseType:'blob'
      });
    } catch (error) {
      throw error;
    }
  };

  // ACA Email pdf

  
  export const getACAEmail = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/acaevent/${payload.id}/email/pdf`,
        responseType:'blob'
      });
    } catch (error) {
      throw error;
    }
  };