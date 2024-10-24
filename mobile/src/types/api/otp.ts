import { ApiResponse } from "./api";



export interface SignUpOtpUser {
  emailOrMobile: string;
  password: string;
  firstName:string;
  lastName:string;
  dob:string;
  gender:string;
  token: string;
  requestedRole:string;
  roles: [string];
}

export interface SignUpOtpUserApiResponse extends ApiResponse {
  entity: SignUpOtpUser;
}

export interface ValidateOtpUserSignUpDetails{
  otp:string
}

export interface OtpSignupUserDetails{
  name:string, 
  email:string, 
  password:string, 
  confirmPassword:string,
  acceptTerms:boolean
}

