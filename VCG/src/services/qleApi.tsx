import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type QLEState = {
  "id":0,
  "firstName":'',
  "middleName":'',
  "lastName":'',
  "SSN":0,
  "event1":0,
  "event2":0,
  "email": '',
  "number":0,
  "dob":0,
  "status":0,
  "uniqueLink":'',
};

export const getAllQLEsDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };  
  try {
    return axios({
      method: "get",
      headers: headers,
      url: BASE_URL + `/qleevent/${payload.empId}/listing/${payload.statusId}`, 
    });
  } catch (error) {
    throw error;
  }
};

export const editQleEventById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
  try {console.log("test api");
    return axios({
      method: "put",
      headers: headers,
      url: BASE_URL + `/qleevent/${payload.id}`, 
      data: { firstName: payload.firstName,middleName: payload.middleName,lastName: payload.lastName, SSN: payload.SSN,
        eventTypeId: payload.eventTypeId,eventSubTypeId: payload.eventSubTypeId,evntDate: payload.evntDate, eventStatus: payload.status},
    });
  } catch (error) {
    throw error;
  }
};

//editById
export const getEditById = (payload: any): any => { console.log("api data");console.log(payload)
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
  try {
    return axios({
      method: "get",
      headers: headers,
      url: BASE_URL + `/qleevent/${payload.id}`, 
    });
  } catch (error) {
    throw error;
  }
};
  
//delete qle event
export const getQledeleteDeatails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
  try { 
    return axios({
      method: "delete",
      headers: headers,
      url: BASE_URL + `/qleevent/${payload.id}`, 
    });
  } catch (error) {
    throw error;
  }
};

export const getEventStatusDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  
  try { 
    return axios({
      method: "get",
      headers: headers,
      url: BASE_URL + `/qleevent/status`, 
    });
  } catch (error) {
    throw error;
  }
};