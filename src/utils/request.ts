import {BASE_API_URL, TIME_OUT} from "@/global/constants"
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios"
import {getStorageToken, APIResponse} from "@/global"

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: TIME_OUT,
})

instance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
  const token = getStorageToken()
  if (token) config.headers.Authorization = "Bearer " + token
  console.log(`请求配置 === `, config)
  return config
}, function (error: AxiosError) {
  console.error(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response: AxiosResponse) {
  console.log(`请求响应 === `, response.data)
  return Promise.resolve(response)
}, function (error: AxiosError) {
  console.error(error)
  return Promise.reject(error)
})

export function request<T = any>(
  url: string | AxiosRequestConfig,
  config?: AxiosRequestConfig,
  extra?: {
    onFulfilled?: (value: AxiosResponse<APIResponse<T>>) => APIResponse<T>;
    onRejected?: (error: AxiosError) => any;
  },
): Promise<APIResponse<T>> {
  const defaultFulfilled = (response: AxiosResponse) => response.data
  const defaultRejected = (error: AxiosError) => error
  const axiosPromise: Promise<AxiosResponse> =
    typeof url === "string" ? instance(url, config) : instance(url)
  return axiosPromise
    .then(extra?.onFulfilled || defaultFulfilled)
    .catch(extra?.onRejected || defaultRejected)
}
