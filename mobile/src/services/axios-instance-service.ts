import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getAuth } from "./identity-service";



const API_URL = 'http://localhost:3000/api'; // Replace with your API URL

const axiosInstance = (token = "") => {
  const instance: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {},
  });

  const requestHandler = async (request: InternalAxiosRequestConfig<any>) => {
    const auth = await getAuth(); 
    const jwtToken = token || auth?.token;

    if (jwtToken) {
      request.headers.set("x-access-token", jwtToken);
    }
    request.headers.set("content-type", "application/json");

    return request;
  };

  const responseHandler = (response: AxiosResponse) => {
    return response;
  };

  const errorHandler = (error: AxiosError) => Promise.reject(error);

  instance.interceptors.request.use(
    (response: InternalAxiosRequestConfig<any>) => requestHandler(response),
    (error: AxiosError) => errorHandler(error)
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
  );

  return instance;
};

export default axiosInstance;