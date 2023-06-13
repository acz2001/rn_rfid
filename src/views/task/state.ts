import {atom} from "recoil"

export const CompleteTaskModalVisibleState = atom<boolean>({
  key: "CompleteTaskModalVisibleState",
  default: false,
})
