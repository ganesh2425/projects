import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");


type UploadImageState ={
  "formData": any,
}

//files
export const AddUploadImageDetails = (payload:UploadImageState): any => {
    const token = StorageService.getCookies("accessToken");
    return axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/user/imageUpload`,
      data: payload.formData
    })
      .then((response) => {
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

//get UploadImage
export const getUserImage = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/getImage`,
      responseType:'blob'
    });
  } catch (error) {
    throw error;
  }
};

// get user profile
export const getUserProfileDetails = (payload: any) => {
    const token = StorageService.getCookies("accessToken");
    try {
      return axios({
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: BASE_URL + "/user/getProfile ",
      });
    } catch (error) {
      throw error;
    }
  };

// edit user profile
export const getEditUserProfileDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/updateProfile`,
      data: { firstName:payload.firstName,middleName:payload.middleName,lastName:payload.lastName},
    });
  } catch (error) {
    throw error;
  }
};

// change  user Password
export const changeUserProfilePasswordDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/reset`,
      data: { password:payload.password,confirmPassword:payload.confirmPassword},
    });
  } catch (error) {
    throw error;
  }
};