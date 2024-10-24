import { AxiosResponse } from "axios"

import axiosInstance from "./axios-instance-service"

export const post = <T>(url: string, entity: unknown): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosInstance()
      .post(url, entity)
      .then((response: AxiosResponse<T>) => {
        if (response?.data) {
          resolve(response.data)
        }
      })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}

export const get = <T>(url: string,token=''): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosInstance(token)
      .get(url)
      .then((response: AxiosResponse<T>) => {
        if (response?.data) {
          resolve(response.data)
        }
      })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}

export const put = <T>(url: string, entity: unknown): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosInstance()
      .put(url, entity)
      .then((response: AxiosResponse<T>) => {
        if (response?.data) {
          resolve(response.data)
        }
      })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}

export const destroy = <T>(url: string, entity: unknown): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    axiosInstance()
      .delete(url, { data: entity })
      .then((response: AxiosResponse<T>) => {
        if (response?.data) {
          resolve(response.data)
        }
      })
      .catch((error: unknown) => {
        reject(error)
      })
  })
}
