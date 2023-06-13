export type TaskStatus = "NEW" | "RUNNING" | "COMPLETED" | "AUDITED" | "CANCELED"
export const TaskStatusText: Record<TaskStatus, string> = {
  NEW: "新建",
  RUNNING: "进行中",
  COMPLETED: "已完成",
  AUDITED: "已审核",
  CANCELED: "已取消",
}

export type QcWorkType =
  "CHECK_MARK"
  | "OUTSIDE_CHECK"
  | "INSIDE_CHECK"
  | "INSIDE_OUTSIDE_CHECK"
  | "ALL_CHECK"
  | "PACKING"

export const QcWorkText: Record<QcWorkType, string> = {
  CHECK_MARK: "查三唛",
  OUTSIDE_CHECK: "内观检查",
  INSIDE_CHECK: "外观检查",
  INSIDE_OUTSIDE_CHECK: "内外观检查",
  ALL_CHECK: "全检",
  PACKING: "打包",
}
