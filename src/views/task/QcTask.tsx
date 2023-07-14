import React, {ReactElement, useEffect, useState} from "react"
import {KeyboardAvoidingView, ScrollView, StyleSheet, View} from "react-native"
import {Button, ButtonGroup, Input, Text} from "@rneui/base"
import {useToast} from "react-native-toast-notifications"
import {cancelQcTack, getQcTaskInfo, joinQcTask, runningQcTask} from "@/api/task/task"
import {useRecoilState, useSetRecoilState} from "recoil"
import {DeviceConnectState, QcTaskInfo, SocketState} from "@/global/state"
import {TaskStatus, TaskStatusText} from "@/views/task/types"
import workType from "@/wokeType.json"
import {TOAST_DURATION} from "@/global/constants"
import {getStorageDeviceBind, getStorageToken} from "@/global"
import {CancelTaskModalVisibleState} from "@/views/task/state"
import CancelTask from "@/views/task/CancelTask"
import {ScreenNavigationProps} from "@/route"


export function QcTask({navigation, ...props}: ScreenNavigationProps): ReactElement {

  const Toast = useToast()
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)
  const [open] = useRecoilState(DeviceConnectState)
  const setVisible = useSetRecoilState(CancelTaskModalVisibleState)
  const [joinLoading, setJoinLoading] = useState<boolean>(false)

  const [workNumber, setWorkNumber] = useState<string>()

  const [groupSelectedIndex, setGroupSelectedIndex] = useState<number>()
  const [groupSelectedItem, setGroupSelectedItem] = useState<any>()

  const [socketConnect, setSocketConnect] = useRecoilState(SocketState)

  useEffect(() => {
    const info = getStorageDeviceBind()
    if (!info) {
      Toast.show("设备未绑定工作台", {duration: TOAST_DURATION})
    }
    return () => {
      setWorkNumber(undefined)
    }
  }, [])

  const addWorkItem = async () => {
    if (!groupSelectedItem) {
      Toast.show("请选择工种", {duration: TOAST_DURATION})
      return
    }
    if (!workNumber) {
      Toast.show("请输入员工号", {duration: TOAST_DURATION})
      return
    }
    if (qcTask && qcTask.memberList?.some((i: any) => i.workNumber === workNumber)) {
      Toast.show("该员工已上岗", {duration: TOAST_DURATION})
      return
    }
    const param = {
      workNumber,
      workTypeId: groupSelectedItem.workTypeId,
      workTypeName: groupSelectedItem.name,
    }
    try {
      setJoinLoading(true)
      const {success, errorMessage} = await joinQcTask({taskId: qcTask?.taskId, memberList: [param]})
      if (!success) {
        Toast.show(errorMessage || "加入失败", {duration: TOAST_DURATION})
        return
      }
      if (!socketConnect) {
        const {success: taskSuccess, data: task} = await getQcTaskInfo({taskId: qcTask?.taskId})
        if (taskSuccess) setQcTask(task)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setJoinLoading(false)
    }
  }

  const handleCancel = async () => {
    setJoinLoading(true)
    try {
      const {success, errorMessage} = await cancelQcTack({taskId: qcTask?.taskId})
      if (!success) {
        Toast.show(errorMessage || "取消失败", {duration: TOAST_DURATION})
        return
      }
      Toast.show("操作成功", {duration: TOAST_DURATION})
      setVisible(false)
    } catch (e) {
      console.error(e)
    } finally {
      setJoinLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}>
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 20}}>工作台名称：{qcTask?.workbenchName}</Text>
          </View>
          <View>
            <Text style={{fontSize: 20}}>任务状态：{TaskStatusText[qcTask?.taskState as TaskStatus]}</Text>
          </View>
          <View>
            <Text style={{fontSize: 20}}>EPC数量：{qcTask?.epcCount}</Text>
          </View>
          <ButtonGroup
            buttons={workType.map((i: any) => i.name)}
            selectedIndex={groupSelectedIndex}
            onPress={(idx: number) => {
              setGroupSelectedIndex(idx)
              setGroupSelectedItem(workType[idx])
            }}
          />
          <View style={{height: 60}}>
            <Input
              containerStyle={{height: 26}}
              inputContainerStyle={{backgroundColor: "#f0f0f0", maxWidth: 400, borderBottomWidth: 0}}
              placeholder="请输入员工工号"
              defaultValue={workNumber || "XYYA"}
              leftIcon={<Text style={{fontSize: 16}}>员工工号</Text>}
              leftIconContainerStyle={{borderRightWidth: 1, borderRightColor: "grey", paddingLeft: 6}}
              rightIcon={<Button
                title="上岗"
                loading={joinLoading}
                buttonStyle={{width: 80}}
                disabled={qcTask?.taskState === "RUNNING"}
                onPress={addWorkItem}/>}
              onChangeText={setWorkNumber}
            />
          </View>
          <View style={{flexDirection: "row"}}>


          </View>
          <Text style={{fontSize: 20}}>已上岗员工：</Text>
          <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
            {qcTask && qcTask.memberList?.map((item: any, i: number) => (
              <View
                key={item.workNumber}
                style={styles.memberListItem}>
                <Text ellipsizeMode="tail" numberOfLines={1}>
                  {`${item.name || ""}${item.workNumber}(${item.workTypeName})`}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
          <Button
            buttonStyle={{width: 120, marginHorizontal: 16}}
            disabled={qcTask?.taskState === "RUNNING"}
            loading={joinLoading}
            onPress={() => setVisible(true)}
            title="取消任务"
          />
          <Button
            buttonStyle={{width: 120, marginHorizontal: 16}}
            disabled={qcTask?.memberList?.length < 3 || qcTask?.taskState === "RUNNING"}
            title="开始任务"
            loading={joinLoading}
            onPress={async () => {
              setJoinLoading(true)
              try {
                if (!open) {
                  Toast.show("设备未连接", {duration: TOAST_DURATION})
                  return
                }
                const {success, errorMessage} = await runningQcTask({taskId: qcTask?.taskId})
                if (!success) {
                  Toast.show(errorMessage || "开始任务出错", {duration: TOAST_DURATION})
                  return
                }
                navigation.replace("Qc")
              } catch (e) {
                console.error(e)
              } finally {
                setJoinLoading(false)
              }
            }}
          />
        </View>
        <CancelTask {...props} navigation={navigation} handleConfirm={handleCancel}/>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    backgroundColor: "#ccc",
  },
  memberListItem: {
    backgroundColor: "#f0f0f0",
    height: 40,
    width: 200,
    padding: 6,
    margin: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
