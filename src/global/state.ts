import {atom} from "recoil"
import {UserInfo} from "./types"


export const userInfo = atom<UserInfo | null>({
  key: "userInfo",
  default: null,
})

export const QcTaskInfo = atom<any>({
  key: "QcTaskInfo",
  default: null,
})

export const DeviceConnectState = atom<boolean>({
  key: "DeviceConnectState",
  default: false,
})

export const DeviceReadState = atom<boolean>({
  key: "DeviceReadState",
  default: false,
})

export const DeviceReaderInfoState = atom<any>({
  key: "DeviceReaderInfoState",
  default: null,
})

export const WorkbenchBindInfo = atom<any>({
  key: "WorkbenchBindInfo",
  default: null,
})
