import React, {forwardRef, ReactElement, useEffect, useState} from "react"
import {StyleSheet, View} from "react-native"
import {Button, Input, Text} from "@rneui/base"
import {storage} from "@/utils"
import {useToast} from "react-native-toast-notifications"
import {cancelQcTack, getActiveTask, joinQcTask, runningQcTask} from "@/api/task/task"
import {useNavigation} from "@react-navigation/native"
import {useRecoilState} from "recoil"
import {QcTaskInfo} from "@/global/state"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {TaskStatus, TaskStatusText} from "@/views/task/types"
import Dropdown from "react-native-modal-dropdown"
import workType from "@/wokeType.json"
import {Workbench} from "@/views/home/types"
import {TOAST_DURATION} from "@/global/constants"


export function QcTask(): ReactElement {
  const Toast = useToast()
  const {navigate, goBack} = useNavigation()
  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  const [workbenchOptions, setWorkbenchOptions] = useState<Array<Workbench>>([])
  const [defaultValue, setDefaultValue] = useState<string>()
  const [selectWorkbench, setSelectWorkbench] = useState()

  const [workNumber, setWorkNumber] = useState<string>()

  const [selectWorkType, setWorkType] = useState()
  const [defaultWorkType, setDefaultWorkType] = useState()

  const [memberList, setMemberList] = useState<any>([])

  const getTaskDetail = async () => {
    const {workbenchId, workbenchName} = await storage.load({key: "workbenchId"})
    // console.log(`workbenchId === `, workbenchId)
    // console.log(`workbenchName === `, workbenchName)
    // console.log(`qcTask === `, qcTask)
    // if (qcTask) return
    const {success, errorMessage, data} = await getActiveTask({workbenchId})
    if (!success) return
    setQcTask(data)
  }

  useEffect(() => {
    getTaskDetail()
    console.log(`质检任务加载`)
  }, [])

  const workTypeSelect = (index: any, opt: any) => {
    setDefaultWorkType(opt.name)
    setWorkType(opt)
    console.log(`工种`, opt)
  }

  const addWorkItem = async (param: any) => {
    if (qcTask && qcTask.memberList?.some((i: any) => i.workNumber === param.workNumber)) {
      Toast.show("该员工已上岗", {duration: TOAST_DURATION})
      return
    }
    const {success, errorMessage} = await joinQcTask({taskId: qcTask?.taskId, memberList: [param]})
    if (!success) {
      Toast.show(errorMessage || "加入失败", {duration: TOAST_DURATION})
      return
    }
    getTaskDetail()
  }

  return <View style={styles.container}>
    <View style={{flex: 1, backgroundColor: "#ccc"}}>
      <View>
        <Text style={{fontSize: 20}}>工作台名称：{qcTask?.workbenchName}</Text>
      </View>
      <View>
        <Text style={{fontSize: 20}}>任务状态：{TaskStatusText[qcTask?.taskState as TaskStatus]}</Text>
      </View>
      <View>
        <Text style={{fontSize: 20}}>EPC数量：{qcTask?.epcCount}</Text>
      </View>
      <View style={{flexDirection: "row", width: 220}}>
        <Input
          containerStyle={{height: 26}}
          inputContainerStyle={{width: 200, backgroundColor: "#f0f0f0"}}
          label="员工工号"
          placeholder="请输入员工工号"
          onChangeText={setWorkNumber}
        />
        <Input
          inputContainerStyle={{width: 200, backgroundColor: "#f0f0f0"}}
          label="工种"
          InputComponent={
            forwardRef((props, ref) => (
              <Dropdown
                showsVerticalScrollIndicator={false}
                saveScrollPosition={false}
                style={{backgroundColor: "#f0f0f0", flex: 1, padding: 2}}
                animated={false}
                defaultValue={defaultWorkType || "请选择"}
                textStyle={{fontSize: 26}}
                options={workType}
                renderRow={(option: any) => <Text style={{fontSize: 22}}>{option.name}</Text>}
                renderButtonText={(option: any) => option.name}
                dropdownStyle={{width: 200, height: 200}}
                dropdownTextStyle={{fontSize: 20}}
                onSelect={workTypeSelect}
              />))}
        />
        <View style={{marginTop: 20}}>
          <Button
            disabled={qcTask?.taskState === "RUNNING"}
            title="上岗"
            onPress={() => {
              if (!workNumber) return
              addWorkItem({
                workNumber,
                // @ts-ignore
                workTypeId: selectWorkType!.workTypeId,
                // @ts-ignore
                workTypeName: selectWorkType!.name,
              })
            }}/>
        </View>
      </View>
      <View style={{flexDirection: "column"}}>
        <Text style={{fontSize: 20}}>已上岗员工：</Text>
        {qcTask && qcTask.memberList?.map((item: any) => (
          <Text style={{fontSize: 20}} key={item.workNumber}>
            {`${item.name}(${item.workNumber})(${item.workTypeName})`}、
          </Text>
        ))}
      </View>
      <View style={{width: 140, position: "absolute", right: 200, bottom: 40}}>
        <Button
          disabled={qcTask?.taskState === "RUNNING"}
          onPress={async () => {
            const {success, errorMessage} = await cancelQcTack({taskId: qcTask?.taskId})
            if (!success) {
              Toast.show(errorMessage || "取消失败", {duration: TOAST_DURATION})
              return
            }
            goBack()
          }}
          title="取消任务"
        />
      </View>
      <View style={{width: 140, position: "absolute", right: 20, bottom: 40}}>
        <Button
          disabled={qcTask?.memberList.length < 3 || qcTask?.taskState === "RUNNING"}
          title="开始任务"
          onPress={async () => {
            const {success, errorMessage} = await runningQcTask({taskId: qcTask?.taskId})
            if (!success) {
              Toast.show(errorMessage || "开始任务出错", {duration: TOAST_DURATION})
              return
            }
            await getTaskDetail()
            navigate("Qc" as never)
          }}
        />
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
})
