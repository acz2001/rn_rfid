import {LoginParams} from "@/views/login/types"
import {request} from "@/utils"
import {Methods} from "@/global/constants"
import {APIResponse, UserInfo} from "@/global/types"

export function emsLogin(data: LoginParams): Promise<APIResponse<UserInfo>> {
  return request<UserInfo>({
    url: "authentication/web/login",
    method: Methods.POST,
    data,
  })
}
