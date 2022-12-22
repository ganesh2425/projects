import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
type FilesState ={
  "formData": any,
}

//files
export const AddFilesDetails = (payload:FilesState): any => {
    const token = StorageService.getCookies("accessToken");
    return axios({
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      url: BASE_URL + `/qleevent/uploadfile`,
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



 // preview

 export const getViewDeatails = (payload: any): any => {
  const token = StorageService.getCookies("accessToken");
  try {
    return axios({
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url:`${BASE_URL}/qleevent/view/${payload.id}/${payload.fileName}`,
              data: {
                  fileName:payload.fileName,
                  // file:payload.file,
                  eventId:payload.eventId
                
              },
      responseType:'blob'

    });
  } catch (error) {
    throw error;
  }
};

//deletefiles
export const getDeleteDeatails = (payload: any): any => {
    const token = StorageService.getCookies("accessToken");
    try{ console.log("deletefile");console.log(payload)
      return axios({
        method: "delete",
        headers: headers,
        url: BASE_URL + `/qleevent/deletefile/${payload.Id}`,
        data:JSON.stringify(payload)
        
      });
    } catch (error) {
      throw error;
    }
  }