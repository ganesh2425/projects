import axios from "axios";
import { BASE_URL } from "../constants/actionTypes";
import StorageService from "./Storage.service";
const token = StorageService.getCookies("accessToken");

type addACAState = {
    "firstName": '',
    "accessToken":'',
  "middleName": '',
  "lastName": '',
  "suffix": '',
  "dob": '',
  "ssn": '',
  "address": '',
  "city": '',
  "stateId": '',
  "zip": '',
  "email": '',
  "phoneNo": '',
  "dependent1": '',
  "dependent2": '',
  "dependent3": '',
  "dependent4": '',
  "preferredContactMethod": '',
  "healthCoverageInfo": '',
  "empOpenEnrollmentState": '',
  "otp":'',
}

// const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     // Authorization: `Bearer ${token}`,
//   };

  export const getAddACADetails = (payload: addACAState): any => {
    // const token = StorageService.getCookies("accessToken");
    const employerId = StorageService.getCookies("employerId");
    try {
      return axios({
        method: "post",
        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        // },
        url: BASE_URL + `/acaform/${employerId}/startmyaca`,
        data: {
             accessToken: payload.accessToken,
            firstName: payload.firstName,
            middleName: payload.middleName,
            lastName: payload.lastName,
            suffix: payload.suffix,
            dob: payload.dob,
            ssn: payload.ssn,
            address: payload.address,
            city: payload.city,
            stateId: payload.stateId,
            zip: payload.zip,
            email: payload.email,
            phoneNo: payload.phoneNo,
            dependent1: payload.dependent1,
            dependent2: payload.dependent2,
            dependent3: payload.dependent3, 
            dependent4: payload.dependent4,
            preferredContactMethod: payload.preferredContactMethod,
            healthCoverageInfo: payload.healthCoverageInfo,
            empOpenEnrollmentState: payload.empOpenEnrollmentState,
            otp:payload.otp,
        },
      });
    } catch (error) {
      throw error;
    }
  };