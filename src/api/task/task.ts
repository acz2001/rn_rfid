import {request} from "@/utils"
import {Methods} from "@/global/constants"


export function createTasks(data: any) {
  return request({
    url: "qc/task/createTask",
    method: Methods.POST,
    data,
  })
}

export function getActiveTask(params: any) {
  return request({
    url: "qc/task/activeTask",
    method: Methods.GET,
    params,
  })
}

export function getQcTaskInfo(params: any) {
  return request({
    url: "qc/task/taskInfo",
    method: Methods.GET,
    params,
  })
}

export function getMemberQty(params: any) {
  return request({
    url: "qc/task/memberQty",
    method: Methods.GET,
    params,
  })
}

export function joinQcTask(data: any) {
  return request({
    url: "qc/task/joinTask",
    method: Methods.POST,
    data,
  })
}

export function recordEpc(data: any) {
  return request({
    url: "qc/task/recordEpc",
    method: Methods.POST,
    data,
  })
}

export function runningQcTask(params: any) {
  return request({
    url: "qc/task/run",
    method: Methods.POST,
    params,
  })
}

export function cancelQcTack(data: any) {
  return request({
    url: "qc/task/cancel",
    method: Methods.POST,
    data,
  })
}

export function getCurrentTask(params: any) {
  return request({
    url: "qc/record/currentTask",
    method: Methods.GET,
    params,
  })
}

export function quickCreateTask(data: any) {
  return request({
    url: "qc/task/quickCreateTask",
    method: Methods.POST,
    data,
  })
}

export function getHistoryTask(params: any) {
  return request({
    url: "qc/task/historyTask",
    method: Methods.GET,
    params,
  })
}
