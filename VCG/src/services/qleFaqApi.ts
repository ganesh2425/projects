import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
// const token = StorageService.getCookies("accessToken");
//const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0cmlnZW50IiwiaWF0IjoxNjUwMzQxMjk2LCJleHAiOjE2NTA0Mjc2OTZ9.PpSa3R5YR9rJXnQbtoy97-0IR04ZjNP5TiU_7LI555OWK6H12H1Ps8ibCdKWU7_cQ3JXEev7_duOYGqSkJkrqA";
type addFaqState = {
  "id": '',
  "number":0,
  "type": '',
  "question": '',
  "answer": '',
  "employer": 0
};

// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${token}`,
// };

export const getAllQleFaqsDetails = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/faq/${payload.type}/all`,
    });
  } catch (error) {
    throw error;
  } 
};

export const getEditFaqDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/faq/${payload.type}/${payload.id}`,
      data: { id: payload.id,number:payload.number,type:payload.type,question:payload.question,answer:payload.answer},
    });
  } catch (error) {
    throw error;
  }
};

export const delFaqDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/faq/${payload.type}/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getFaqById = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/faq/${payload.type}/${payload.id}`,
    });
  } catch (error) {
    throw error;
  } 
};

export const getAddFaqDetails = (payload: addFaqState): any => { 
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/faq/${payload.type}/${payload.employer}/create`,
      // url: BASE_URL + `/faq/qle/1/create`,
      // data: { "id": payload.id,"number":payload.number,"type":payload.type,"question":payload.question,"answer":payload.answer},
      data: { "id": payload.id,"type":payload.type,"question":payload.question,"answer":payload.answer},
    });
  } catch (error) {
    throw error;
  }
};

export const getAllFaqsByEmpDetails = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/faq/${payload.type}/${payload.id}/all`,
    });
  } catch (error) {
    throw error;
  } 
};

export const saveReOrderedFaqs = (payload: any) => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/faq/qle/reorder`,
      data: payload 
    });
  } catch (error) {
    throw error;
  } 
};