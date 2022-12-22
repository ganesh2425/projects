import axios from "axios";
import { BASE_URL, BASE_URL_OTH } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type addRoleState = {
  "name" : "", 
  "description" : "",   
  "privilegeSet" : []
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getAddRoleDetails = (payload: addRoleState): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/role/create",
      data: { name: payload.name, description: payload.description, privilegeSet:payload.privilegeSet },
    });
  } catch (error) {
    throw error;
  }
};

export const getEditRoleDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/role/${payload.id}`,
      data: { name: payload.name, description: payload.description, privilegeSet:payload.privilegeSet },
    });
  } catch (error) {
    throw error;
  }
};

export const getAllRolesDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + "/role/all",
    });
  } catch (error) {
    throw error;
  }
};

export const deleteRoleDetails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/role/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getRoleById = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/role/${payload.id}`
    });
  } catch (error) {
    throw error;
  }
};

export const getAllPrivileges = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/privilege/all`
    });
  } catch (error) {
    throw error;
  }
};