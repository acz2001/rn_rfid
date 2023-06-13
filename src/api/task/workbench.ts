import {request} from "@/utils"
import {APIResponse, Page, Pagination} from "@/global/types"
import {Methods} from "@/global/constants"
import {Workbench} from "@/views/home/types"

export type WorkbenchParam = {
  organizationId: string
}

export function getWorkbenchList(params: WorkbenchParam) {
  return request<Page<Workbench>>({
    url: "qc/workbench/query",
    method: Methods.GET,
    params,
  })
}

export function bindWorkbench(data: any) {
  return request({
    url: "qc/device/bind",
    method: Methods.POST,
    data,
  })
}

export function getBindWorkbench(params: any) {
  return request({
    url: "qc/device/getWorkbench",
    method: Methods.GET,
    params,
  })
}
