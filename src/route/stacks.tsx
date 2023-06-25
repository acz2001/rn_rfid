import {ScreensType} from "@/route/type"
import {LoginForm} from "@/views/login"
import {Home} from "@/views/home"
import {Text} from "@rneui/base"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import React, {ReactElement, useCallback} from "react"
import {SystemSetting} from "@/views/settings"
import {TouchableOpacity, View} from "react-native"
import {useRecoilState} from "recoil"
import {TaskStatus, QcTask, Qc, HistoryTask, TaskStatusText} from "@/views/task"
import {DeviceConnectState, QcTaskInfo} from "@/global/state"
import {HeaderBackButtonProps} from "@react-navigation/native-stack/lib/typescript/src/types"
import {DrawerFn} from "@/components/Drawer"
import QcRecord from "@/views/task/QcRecord"
import LoadingPage from "@/views/LoadingPage"
import HistoryTaskDetail from "@/views/task/HistoryTaskDetail"


type QcTitleProps = {
  title?: string;
  hasTask?: boolean
}

export function QcTitle({hasTask, title}: QcTitleProps): ReactElement {

  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const [open] = useRecoilState(DeviceConnectState)

  const hasQcTitleNode: ReactElement = (
    <View>
      <Text style={{fontSize: 18}}>
        {`${qcTask?.workbenchName}(${TaskStatusText[qcTask?.taskState as TaskStatus]})`}
        {!open ? "(读写器未连接.........)" : ""}
      </Text>
    </View>
  )

  const workbenchTitleNode: ReactElement = (
    <Text style={{fontSize: 18}}>{title}{qcTask ? `(${qcTask?.workbenchName})` : ""}</Text>
  )

  return (<View>
    {hasTask ? hasQcTitleNode : workbenchTitleNode}
  </View>)
}

export function HomeLeftTitle(props:any) {

  const openDrawer = useCallback(() => {
    DrawerFn.current?.openDrawer()
  }, [DrawerFn])

  return (<TouchableOpacity onPress={openDrawer}>
    <FontAwesome name="navicon" size={26}/>
  </TouchableOpacity>)
}


export const StacksList: ScreensType = [
  {
    name: "LoadingPage",
    component: LoadingPage,
    options: {header: () => null},
    navigationKey: "LoadingPage",
  },
  {
    name: "Login",
    component: LoginForm,
    options: {headerShown: false},
    navigationKey: "Login",
  },
  {
    name: "Home",
    component: Home,
    options: {
      headerBackVisible: true,
      headerRight: (props: HeaderBackButtonProps) => <HomeLeftTitle {...props} />,
      headerTitle: () => <Text>质检系统</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "Home",
  },
  {
    name: "settings",
    component: SystemSetting,
    options: {
      headerTitle: () => <Text>系统设置</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "settings",
  },
  {
    name: "Qc",
    component: Qc,
    options: {
      headerTitle: () => <QcTitle hasTask/>,
      headerTitleAlign: "center",
      headerRight: (props: HeaderBackButtonProps) => <HomeLeftTitle/>,
    },
    navigationKey: "Qc",
  },
  {
    name: "QcTask",
    component: QcTask,
    options: {
      headerTitle: () => <QcTitle title="质检任务"/>,
      headerTitleAlign: "center",
      headerRight: (props: HeaderBackButtonProps) => <HomeLeftTitle/>,
    },
    navigationKey: "QcTask",
  },
  {
    name: "History",
    component: HistoryTask,
    options: {
      headerTitle: () => <QcTitle title="历史任务(最近100条记录)"/>,
      headerTitleAlign: "center",
    },
    navigationKey: "History",
  },
  {
    name: "QcRecord",
    component: QcRecord,
    options: {
      headerTitle: () => <QcTitle title="质检记录"/>,
      headerTitleAlign: "center",
    },
    navigationKey: "QcRecord",
  },
  {
    name: "HistoryTaskDetail",
    component: HistoryTaskDetail,
    options: {
      headerTitle: () => <Text>任务详情</Text>,
      headerTitleAlign: "center",
    },
    navigationKey: "HistoryTaskDetail",
  },
]
