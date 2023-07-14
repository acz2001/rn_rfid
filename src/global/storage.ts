import {MMKV} from "react-native-mmkv"
import {StorageSetValue, UserInfo} from "./types"
import {StorageEmptyDefaultParse, StorageKeys} from "./constants"

export const storage: MMKV = new MMKV()

export const setStorage = (key: string, value: StorageSetValue) => storage.set(key, value)

export const getStorageString = (key: string) => JSON.parse(storage.getString(key) || StorageEmptyDefaultParse)
export const getStorageNumber = (key: string) => storage.getNumber(key)
export const getStorageBoolean = (key: string) => storage.getBoolean(key)

export const deleteAllStorage = () => storage.clearAll()

export const setStorageToken = (value: StorageSetValue) => storage.set(StorageKeys.token, value)

export const setStorageUserInfo = (value: StorageSetValue) => storage.set(StorageKeys.userInfo, value)

export const setStorageDeviceBind = (value: StorageSetValue) => storage.set(StorageKeys.deviceBind, value)

export const getStorageToken = () => storage.getString(StorageKeys.token)

export const getStorageUserInfo = (): UserInfo | null => JSON.parse(storage.getString(StorageKeys.userInfo) || StorageEmptyDefaultParse)

export const getStorageDeviceBind = () => JSON.parse(storage.getString(StorageKeys.deviceBind) || StorageEmptyDefaultParse)


export const deleteStorage = (key: string) => storage.delete(key)

export const deleteStorageUser = () => {
  storage.delete(StorageKeys.token)
  storage.delete(StorageKeys.userInfo)
}

