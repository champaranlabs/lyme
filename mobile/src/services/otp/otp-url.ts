import { UrlParamsReplace } from "@src/constants/common";


export const CREATE_OTP_USER_SIGNUP = () => UrlParamsReplace("/v1/signup-otps")
export const VALIDATE_OTP_USER_SIGNUP = () => UrlParamsReplace("/v1/signup-validate-otps")