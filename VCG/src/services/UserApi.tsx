import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type addUserState = {
  "username":"",
  "name":"",
  "firstname": "",
  "middlename": "",
  "lastname": "",
  "email": "",
  "status":"",
  "roleSet": [],

};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getAddUSERDetails = (payload: addUserState): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL_OTH + "/qleform/auth",
      data: { payload },
    });
  } catch (error) {
    throw error;
  }
};

 

// user
export const getUserDetails = (): any => {
  const token = StorageService.getCookies("accessToken");
  try {console.log("api");
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/user/all", 
    });
  } catch (error) {
    throw error;
  }
};
//add user
export const getAddUserDetails = (payload: addUserState): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/user/create",
      data: { username:payload.username,firstName: payload.firstname,middleName: payload.middlename,lastName: payload.lastname
        , email: payload.email, roleSet:payload.roleSet, status:payload.status },
    });
  } catch (error) {
    throw error;
  }
};

export const getEditUserDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    let data1= { username:payload.username,firstName: payload.firstname,middleName: payload.middlename,lastName: payload.lastname, email: payload.email, roleSet:payload.roleSet};
    console.log("edit api");console.log(data1)
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/${payload.id}`,
      data: { username:payload.username,firstName: payload.firstname,middleName: payload.middlename,lastName: payload.lastname, email: payload.email, roleSet:payload.roleSet, status:payload.status},
    });
  } catch (error) {
    throw error;
  }
};
export const getUserById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};
export const getAllRoleset = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/role/all"
    });
  } catch (error) {
    throw error;
  }
};

export const deleteUserDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    console.log(payload)
    return axios({
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/user/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getActiveUserDetails = (): any => {
  const token = StorageService.getCookies("accessToken");
  try{
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/user/allActive", 
    });
  } catch (error) {
    throw error;
  }
};

//Logout
export const getLogoutDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/auth/signout",
      data: { accessToken:token },
    });
  } catch (error) {
    throw error;
  }
};


 