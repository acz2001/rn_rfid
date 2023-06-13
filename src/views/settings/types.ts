export type SettingType = {}


export type SettingOptProps = {
  defaultActiveKey?: string;
  onChange?: (key: string) => void
}

export type SettingContainerProps = {
  activeKey: string;
}


export type SettingOptItem = {
  key: string;
  name: string;
}

export const settingOpts: Array<SettingOptItem> = [
  {
    key: "create",
    name: "连接",
  },
  {
    key: "power",
    name: "功率",
  },
  {
    key: "ant",
    name: "天线",
  },
]

export const powerOptions = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
]
