import {atom} from "recoil"
import {UserInfo} from "./types"


export const UserInfoState = atom<UserInfo | null>({
  key: "UserInfoState",
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

export const DrawerLayoutPosition = atom<"left" | "right">({
  key: "DrawerLayoutPosition",
  default: "left",
})

export const SignOutModalVisibleState = atom<boolean>({
  key: "SignOutModalVisibleState",
  default: false,
})

export const DrawerLockModeState = atom<"unlocked" | "locked-closed" | "locked-open">({
  key: "DrawerLockModeState",
  default: undefined,
})

export const SocketState = atom<boolean>({
  key: "SocketState",
  default: false,
})
