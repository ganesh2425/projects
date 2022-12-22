import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";

export const getStates = (payload: any): any => {
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      url: `${BASE_URL}/state/getAll`,
    });
  } catch (error) {
    throw error;
  }
};
