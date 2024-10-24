import * as HttpService from '@src/services/http-service';
import { CREATE_OTP_USER_SIGNUP, VALIDATE_OTP_USER_SIGNUP } from "./otp-url";
import { OtpSignupUserDetails, ValidateOtpUserSignUpDetails } from "@src/types/api/otp";


export const createOtpUserSignUp = (otpSignupUserDetails:OtpSignupUserDetails) => HttpService.post(CREATE_OTP_USER_SIGNUP(),otpSignupUserDetails);
export const validateOtpUserSignUp = (validateOtpUserSignUpDetails:ValidateOtpUserSignUpDetails) => HttpService.post(VALIDATE_OTP_USER_SIGNUP(),validateOtpUserSignUpDetails);

