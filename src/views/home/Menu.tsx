import React, {useCallback, useEffect, useState} from "react"
import {TouchableOpacity, View} from "react-native"
import {StyleSheet} from "react-native"
import {useNavigation} from "@react-navigation/native"
import {menuItem, menuModules} from "./types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {Text} from "@rneui/base"
import CreateTaskDialog from "@/views/home/CreateTaskDialog"
import {QcTask} from "@/views/task/QcTask"
import {createTasks, getActiveTask} from "@/api/task/task"
import {storage} from "@/utils"
import {TOAST_DURATION} from "@/global/constants"
import {useRecoilState, useSetRecoilState} from "recoil"
import {DeviceConnectState, QcTaskInfo, WorkbenchBindInfo} from "@/global/state"
import DeviceInfo from "react-native-device-info"
import WorkbenchBindModal from "@/views/home/WorkbenchBindModal"
import {getBindWorkbench} from "@/api/task/workbench"
import {useToast} from "react-native-toast-notifications"

export function Menu(): React.ReactElement {

  const Toast = useToast()
  const {navigate} = useNavigation()
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [taskModalVisible, setTaskVisible] = useState(false)
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  const [workbenchVisible, setWorkbenchVisible] = useState(false)
  const [workbenchName, setWorkbenchName] = useState<string>("")

  const setBindInfo = useSetRecoilState(WorkbenchBindInfo)

  const toggleOverlay = () => {
    setWorkbenchVisible(!workbenchVisible)
  }

  const getTaskDetail = async () => {
    const {workbenchId} = await storage.load({key: "workbenchId"})
    const {success, data} = await getActiveTask({workbenchId})
    if (!success) return
    setQcTask(data)
    const deviceId = await DeviceInfo.getUniqueId()
    setBindInfo((val: any) => ({deviceId}))
    const {success: getSuccess, errorMessage, data: Workbench} = await getBindWorkbench({deviceId})
    if (!getSuccess) {
      Toast.show(errorMessage || "设备未绑定工作台", {duration: TOAST_DURATION})
      return
    }
    await storage.save({
      key: "deviceBindInfo",
      data: Workbench,
    })
    setBindInfo(Workbench)
  }

  useEffect(() => {
    getTaskDetail()
    storage.load({key: "deviceBindInfo"}).then(r => {
      setWorkbenchName(r.name)
    })
  }, [])

  const toggleDialog = () => setTaskVisible(!taskModalVisible)
  const createTask = async (val: any) => {
    try {
      const {success, data, errorMessage} = await createTasks(val)
      if (!success) {
        Toast.show(errorMessage || "创建失败", {duration: TOAST_DURATION})
        return
      }
      await storage.save({
        key: "workbenchId",
        data: {
          workbenchId: val.workbenchId,
          workbenchName: val.workbenchName,
        },
        expires: null,
      })
      setQcTask(data)
      setTaskVisible(!taskModalVisible)
      Toast.show("创建成功", {duration: TOAST_DURATION})
    } catch (e) {
      console.log(e)
    }
  }

  const currentQcTask = () => {
    if (!open) {
      Toast.show("设备未连接", {duration: TOAST_DURATION})
      return
    }
    if (qcTask && qcTask?.taskState === "RUNNING") {
      navigate("Qc" as never)
    } else {
      navigate("QcTask" as never)
    }
  }

  return (<View style={styles.menuContainer}>
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={toggleOverlay}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="object-group" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        工作台:{workbenchName || "未绑定"}
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
      onPress={() => navigate("History" as never)}>
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
      onPress={() => navigate("settings" as never)}>
      <Text style={{textAlign: "center"}}>
        <FontAwesome name="gear" size={48}/>
      </Text>
      <Text style={{fontSize: 20}}>
        系统设置
      </Text>
    </TouchableOpacity>

    {taskModalVisible && <CreateTaskDialog
      isVisible={taskModalVisible}
      onBackdropPress={toggleDialog}
      onConfirm={createTask}
      onCancel={toggleDialog}
      confirmButtonStyle={{marginLeft: 10, width: 80}}
      cancelButtonStyle={{marginLeft: 10, width: 80}}
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
