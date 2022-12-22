import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

//Notes
export const getNotesDeatails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try {
     
    console.log("api");console.log(payload.id);console.log(payload.eventNotes);
      return axios({
        method: "post",
        headers: headers,
        url: BASE_URL + `/qleevent/notes`, 
        data:{qleEventId:payload.id,eventNotes:payload.eventNotes},
      });
    } catch (error) {
      throw error;
    }
  }