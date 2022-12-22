import jwt_decode from "jwt-decode";
import StorageService from "../services/Storage.service";

interface extV {
    "exp": number,
    "iss": string,
    "aud": string
}

export function checkTokenExpiration(): boolean  {
    const token = StorageService.getCookies('accessToken');
    const extractValue: extV = jwt_decode(token);
    console.log(Date.now() / 1000);
    console.log(extractValue.exp);
    if (extractValue.exp < Date.now() / 1000) {
        StorageService.clearCookies();
        return false
    }
    return true;
}