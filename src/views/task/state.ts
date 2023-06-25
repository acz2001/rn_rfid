import {atom} from "recoil"

export const CompleteTaskModalVisibleState = atom<boolean>({
  key: "CompleteTaskModalVisibleState",
  default: false,
})

export const CreateTaskModalVisibleState = atom<boolean>({
  key: "CreateTaskModalVisibleState",
  default: false,
})

export const CancelTaskModalVisibleState = atom<boolean>({
  key: "CancelTaskModalVisibleState",
  default: false,
})

export const QueryHistoryTaskItem = atom<{ [key: string]: any } | null>({
  key: "QueryHistoryTaskItem",
  default: null,
})
