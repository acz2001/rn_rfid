export const BASE_API_URL: string = "https://ems-test.56xyy.net/api/"
// export const BASE_API_URL: string = "http://192.168.1.220:5900"

export const CONNECT_SLD: string = "sld:///dev/ttyS6"
export const TIME_OUT: number = 5000

export const TOAST_DURATION: number = 6000

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}

export const StorageEmptyDefaultParse: string = "null"

export enum StorageKeys {
  token = "token",
  userInfo = "user.info",
  deviceId = "device.id",
  deviceBind = "device.bind.info"
}
