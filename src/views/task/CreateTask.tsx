import React, {ReactElement, ReactNode, useEffect, useRef, useState} from "react"
import {Button, ButtonGroup, Card, Input, Text} from "@rneui/base"
import {Keyboard, StyleSheet, View} from "react-native"
import {getStorageDeviceBind, getStorageUserInfo} from "@/global"
import workType from "@/wokeType.json"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {TOAST_DURATION} from "@/global/constants"
import {useRecoilState} from "recoil"
import {QcTaskInfo, WorkbenchBindInfo} from "@/global/state"
import RModal, {ModalToastRef, RModalProps} from "@/components/RModal"
import {CreateTaskModalVisibleState} from "@/views/task/state"
import {createTasks, quickCreateTask} from "@/api/task/task"
import {ScreenNavigationProps} from "@/route"
import {useToast} from "react-native-toast-notifications"

interface CreateTaskProps extends RModalProps, ScreenNavigationProps {
  title?: ReactNode;
  handleConfirm?: (val: any) => void;
  params?: any
}

export default function CreateTask(
  {
    title,
    handleConfirm,
    params,
    navigation,
    ...props
  }: CreateTaskProps,
): ReactElement {

  const Toast = useToast()
  const inputRef = useRef<Input | null>(null)
  const toastRef = useRef<ModalToastRef | null>(null)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [visible, setVisible] = useRecoilState(CreateTaskModalVisibleState)

  const [workNumber, setWorkNumber] = useState<string>()

  const [memberList, setMemberList] = useState<any>([])

  const [qcTask, setQcTask] = useRecoilState(QcTaskInfo)

  const [groupSelectedIndex, setGroupSelectedIndex] = useState<number>()
  const [groupSelectedItem, setGroupSelectedItem] = useState<any>()

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        inputRef.current?.blur()
      },
    )
    if (params) {
      setMemberList(params.memberList || [])
    }
    const info = getStorageUserInfo()
    if (info && !params) {
      const {workerProfile} = info
      setWorkNumber(workerProfile.workNumber)
    } else {
      setWorkNumber("")
    }
    return () => {
      keyboardDidHideListener.remove()
    }
  }, [])

  const addWorkItem = () => {
    if (!workNumber || workNumber.length < 5) {
      toastRef.current?.toastMessage("请输入工号", {duration: TOAST_DURATION, type: "warning"})
      return
    }
    if (!groupSelectedItem) {
      toastRef.current?.toastMessage("请选择工种", {duration: TOAST_DURATION, type: "warning"})
      return
    }
    if (memberList.some((i: any) => i.workNumber === workNumber)) {
      toastRef.current?.toastMessage("该员工已添加", {duration: TOAST_DURATION})
      return
    }
    const list = [{
      workNumber,
      workTypeId: groupSelectedItem?.workTypeId,
      workTypeName: groupSelectedItem?.name,
    }]
    setMemberList([...memberList, ...list])
    setWorkNumber("")
    setGroupSelectedIndex(undefined)
    setGroupSelectedItem(undefined)
  }

  const onCreateTask = async () => {
    setSubmitLoading(true)
    try {
      const {success, data, errorMessage} = await createTasks({
        workbenchId: getStorageDeviceBind()?.workbenchId,
        workbenchName: getStorageDeviceBind()?.name,
        memberList,
      })
      if (!success) {
        toastRef?.current?.toastMessage(errorMessage || "创建失败", {duration: TOAST_DURATION})
        return
      }
      setQcTask(data)
      setVisible(false)
      Toast.show("创建成功", {duration: TOAST_DURATION})
    } catch (e) {
      console.log(e)
    } finally {
      setSubmitLoading(false)
    }
  }


  const onConfirmButton = async () => {
    setSubmitLoading(true)
    try {
      const {success, errorMessage, data} = await quickCreateTask({
        workbenchId: getStorageDeviceBind()?.workbenchId,
        workbenchName: getStorageDeviceBind()?.name,
        memberList,
        taskId: qcTask?.taskId,
      })
      if (!success) {
        toastRef.current?.toastMessage(errorMessage || "操作失败", {duration: TOAST_DURATION})
        return
      }
      toastRef.current?.toastMessage("操作成功", {duration: TOAST_DURATION})
      setVisible(false)
      navigation.replace("Home")
      navigation.replace("QcTask")
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <RModal
      {...props}
      modalStyle={{width: 800, flex: 1}}
      visible={visible}
      confirmButtonProps={{size: "lg", loading: submitLoading}}
      cancelButtonProps={{size: "lg"}}
      confirmButtonText={params ? "替换" : "新建"}
      onRequestClose={() => setVisible(false)}
      onMask={() => setVisible(false)}
      ref={toastRef}
      onCancel={() => setVisible(false)}
      onConfirm={!params ? onCreateTask : onConfirmButton}
    >
      <Card.Title style={{textAlign: "left"}}>{title || "新建任务"}</Card.Title>
      <Card.Divider/>
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
          ref={(ref: any) => inputRef}
          containerStyle={{height: 26}}
          inputContainerStyle={{backgroundColor: "#f0f0f0", maxWidth: 400, borderBottomWidth: 0}}
          placeholder="请输入员工工号"
          defaultValue={workNumber || "XYYA"}
          leftIcon={<Text style={{fontSize: 16}}>员工工号</Text>}
          leftIconContainerStyle={{borderRightWidth: 1, borderRightColor: "grey", paddingLeft: 6}}
          rightIcon={<Button
            title="添加"
            buttonStyle={{width: 80}}
            onPress={addWorkItem}/>}
          onChangeText={setWorkNumber}
        />
      </View>

      <Text style={{fontSize: 18}}>已选择员工：</Text>
      <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap"}}>
        {memberList.map((item: any, i: number) => (
          <View
            key={item.workNumber}
            style={styles.memberListItem}>
            <Text numberOfLines={1} ellipsizeMode="tail">
              {`${item.name || ""}${item.workNumber}(${item.workTypeName})`}
            </Text>
            <FontAwesome onPress={() => {
              const list = [...memberList]
              list.splice(i, 1)
              setMemberList([...list])
            }} name="close" size={30}/>
          </View>
        ))}
      </View>


    </RModal>
  )
}

const styles = StyleSheet.create({
  memberListItem: {
    backgroundColor: "#ccc",
    height: 40,
    width: 240,
    padding: 6,
    margin: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})
