import React, {useEffect, useState} from "react"
import {TouchableOpacity, View} from "react-native"
import {StyleSheet} from "react-native"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {Button, Text} from "@rneui/base"
import CreateTask from "@/views/task/CreateTask"
import {QcTask} from "@/views/task/QcTask"
import {getActiveTask} from "@/api/task/task"
import {TOAST_DURATION} from "@/global/constants"
import {useRecoilState, useSetRecoilState} from "recoil"
import {DeviceConnectState, DrawerLockModeState, QcTaskInfo, WorkbenchBindInfo} from "@/global/state"
import WorkbenchBindModal from "@/views/home/WorkbenchBindModal"
import {getBindWorkbench} from "@/api/task/workbench"
import {useToast} from "react-native-toast-notifications"
import {ScreenNavigationProps} from "@/route"
import {CreateTaskModalVisibleState} from "@/views/task/state"
import {getStorageDeviceBind, getStorageToken} from "@/global"
import ReconnectingWebSocket from "reconnecting-websocket"


export function Menu({navigation, ...props}: ScreenNavigationProps): React.ReactElement {

  const Toast = useToast()
  const {navigate} = navigation
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [taskModalVisible, setTaskVisible] = useRecoilState(CreateTaskModalVisibleState)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const [bindInfo, setBindInfo] = useRecoilState(WorkbenchBindInfo)
  const setDrawerLockMode = useSetRecoilState(DrawerLockModeState)

  const [workbenchVisible, setWorkbenchVisible] = useState(false)
  const [workbenchName, setWorkbenchName] = useState<string>("")

  const getTaskDetail = ({deviceId, workbenchId}: any) => {
    try {
      Promise.all([getActiveTask({workbenchId}), getBindWorkbench({deviceId})])
        .then(([{data: task}, {data: info}]) => {
          setQcTask(task)
          setBindInfo(info)
        })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    const info = getStorageDeviceBind()
    if (info) {
      const {deviceId, workbenchId} = info
      setBindInfo(info)
      getTaskDetail({deviceId, workbenchId})
    } else {
      Toast?.show("设备未绑定工作台", {duration: TOAST_DURATION})
    }
    setDrawerLockMode("unlocked")

    // const ws = new WebSocket("ws://192.168.1.220:8080/ws/topic?topic=testTaskId")
    //
    // ws.onopen = () => {
    //   console.log("WebSocket connected")
    // }
    //
    // ws.onmessage = (e) => {
    //   // a message was received
    //   console.log(e.data)
    // }
    //
    // ws.onerror = (e) => {
    //   // an error occurred
    //   console.log(e.message)
    // }
    //
    // ws.onclose = (e) => {
    //   // connection closed
    //   console.log(e.code, e.reason)
    // }

  }, [])

  const toggleDialog = () => {
    if (!bindInfo.workbenchId) {
      Toast?.show("设备未绑定工作台", {duration: TOAST_DURATION})
      return
    }
    setTaskVisible(!taskModalVisible)
  }

  const currentQcTask = () => {
    if (qcTask && qcTask?.taskState === "RUNNING") {
      if (!open) {
        Toast.show("设备未连接", {duration: TOAST_DURATION})
        return
      }
      navigate("Qc")
    } else {
      navigate("QcTask")
    }
  }

  return (<View style={styles.menuContainer}>
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={() => setWorkbenchVisible(!workbenchVisible)}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="object-group" size={48}/>
      </Text>
      <Text style={{fontSize: 18}} ellipsizeMode="tail" numberOfLines={1}>
        工作台:{bindInfo?.name || "未绑定"}
      </Text>
    </TouchableOpacity>

    {qcTask && <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={currentQcTask}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="tasks" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        质检任务
      </Text>
    </TouchableOpacity>}

    {!qcTask && <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={toggleDialog}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="plus" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        新建任务
      </Text>
    </TouchableOpacity>}

    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={() => {
        const {workbenchId} = bindInfo
        if (!workbenchId) {
          Toast.show("未绑定工作台", {type: "warning"})
          return
        }
        navigate("History")
      }}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="list-alt" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        历史任务
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={() => navigate("settings")}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="gear" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        系统设置
      </Text>
    </TouchableOpacity>

    {taskModalVisible && <CreateTask
      {...props}
      navigation={navigation}
    />}

    {workbenchVisible && <WorkbenchBindModal
      onBackdropPress={() => setWorkbenchVisible(false)}
      onBind={setWorkbenchVisible}
      isVisible={workbenchVisible}/>}
  </View>)
}


const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    padding: 8,
  },
  menuItem: {
    width: 120,
    height: 120,
    elevation: 6,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "white",
  },
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
})
