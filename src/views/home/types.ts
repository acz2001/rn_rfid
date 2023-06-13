export type menuItem = {
  icon: string;
  name: string;
  label: string
}

export const menuModules: Array<menuItem> = [
  {
    icon: "tasks",
    name: "tasks",
    label: "质检任务",
  },
  {
    name: "plusTack",
    icon: "plus",
    label: "新建任务",
  },
  {
    icon: "gear",
    name: "settings",
    label: "系统设置",
  },
]

export type Workbench = {
  code: string;
  createTime: string;
  name: string;
  organizationId: string;
  workbenchId: string;
}
