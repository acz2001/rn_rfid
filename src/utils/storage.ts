import AsyncStorage from "@react-native-async-storage/async-storage"
import Storage from "react-native-storage"

export const storage: Storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  // 如果storage中没有相应数据，或数据已过期，则会调用相应的sync方法，无缝返回最新数据。
  sync: {
    token: () => null,
    userInfo: () => null,
    workbenchId: () => null,
    deviceBindInfo: () => null,
  },
})
