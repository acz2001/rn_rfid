import {storage} from "@/utils"
import {StorageKeys} from "@/global/constants"
import {UserInfo} from "@/global/types"

export async function setStorageUserInfo(data: UserInfo, expires: number = 1000 * 3600 * 24) {
  await storage.save({
    key: StorageKeys.userInfo,
    data,
    expires,
  })
}

export function getStorageUserInfo(): Promise<UserInfo | null> {
  return storage.load({key: StorageKeys.userInfo})
}

export async function setStorageToken(token: string, expires: number = 1000 * 3600 * 24) {
  await storage.save({
    key: StorageKeys.token,
    data: token,
    expires,
  })
}

export function getStorageToken(): Promise<string | null> {
  return storage.load({key: StorageKeys.token})
}

export async function removeStorageAuth() {
  await storage.remove({key: StorageKeys.token})
  await storage.remove({key: StorageKeys.userInfo})
}
