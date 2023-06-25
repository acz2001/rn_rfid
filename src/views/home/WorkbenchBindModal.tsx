import React, {forwardRef, ReactElement, useEffect, useState} from "react"
import {Button, Input, Overlay, Text} from "@rneui/base"
import {View} from "react-native"
import {OverlayProps} from "@rneui/base/dist/Overlay/Overlay"
import Dropdown from "react-native-modal-dropdown"
import {Workbench} from "@/views/home/types"
import {getStorageDeviceBind, getStorageUserInfo, QcTaskInfo, setStorageDeviceBind, WorkbenchBindInfo} from "@/global"
import {bindWorkbench, getWorkbenchList} from "@/api/task/workbench"
import {ToastType, useToast} from "react-native-toast-notifications"
import {TOAST_DURATION} from "@/global/constants"
import {useRecoilState, useSetRecoilState} from "recoil"
import {getActiveTask} from "@/api/task/task"

export interface WorkbenchBindModalProps extends OverlayProps {
  onBind: (v: boolean) => void
}

export default function WorkbenchBindModal({onBind, ...props}: WorkbenchBindModalProps): ReactElement {

  const Toast: ToastType = useToast()
  const [workbenchOptions, setWorkbenchOptions] = useState<Array<Workbench>>([])
  const [defaultValue, setDefaultValue] = useState<string>()
  const [selectWorkbench, setSelectWorkbench] = useState<Workbench>()
  const [loading, setLoading] = useState<boolean>(false)
  const [bindInfo, setBindInfo] = useRecoilState(WorkbenchBindInfo)
  const setQcTask = useSetRecoilState(QcTaskInfo)

  const getWorkbench = async () => {
    try {
      const userInfo = getStorageUserInfo()
      console.log(userInfo)
      const {data, success} = await getWorkbenchList({
        organizationId: userInfo?.workerProfile?.organizationId as string,
      })
      if (!success) return
      setWorkbenchOptions(data.content)
    } catch (e) {
      console.log(e)
    }
  }

  const getTaskDetail = async ({workbenchId}: any) => {
    try {
      const {success, data} = await getActiveTask({workbenchId})
      if (success) setQcTask(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getWorkbench()
    const info = getStorageDeviceBind()
    if (info) {
      setDefaultValue(info.name)
      setSelectWorkbench(info)
    }
  }, [])

  const dropdownSelect = (index: any, opt: any) => {
    setDefaultValue(opt.name)
    setSelectWorkbench(opt)
  }

  const handleBind = async () => {
    try {
      setLoading(true)
      const {workbenchId, name, code} = selectWorkbench as Workbench
      const param = {...bindInfo, workbenchId, name, code}
      const {success, errorMessage} = await bindWorkbench(param)
      if (!success) {
        Toast.show(errorMessage || "绑定失败", {duration: TOAST_DURATION})
        return
      }
      await getTaskDetail({workbenchId})
      Toast.show("绑定成功", {duration: TOAST_DURATION})
      setStorageDeviceBind(JSON.stringify(param))
      setBindInfo(param)
      onBind(false)
    } catch (e) {
      Toast.show((e as Error).message, {duration: TOAST_DURATION})
    } finally {
      setLoading(false)
    }
  }

  return (
    <Overlay
      {...props}
      overlayStyle={{backgroundColor: "white"}}>
      <View>
        <Input
          inputContainerStyle={{width: 240}}
          label="工作台"
          InputComponent={
            forwardRef((props, ref) => (
              <Dropdown
                <Workbench>
                disabled={!workbenchOptions.length}
                showsVerticalScrollIndicator={false}
                saveScrollPosition={false}
                style={{backgroundColor: "#f0f0f0", flex: 1, padding: 2}}
                animated={false}
                defaultValue={defaultValue || "请选择"}
                textStyle={{fontSize: 26, color: "#000"}}
                options={workbenchOptions}
                renderRow={(option: Workbench) => (
                  <Text
                    style={{fontSize: 22, backgroundColor: "white"}}>
                    {option.name}
                  </Text>
                )}
                renderButtonText={(option: any) => option.name}
                dropdownStyle={{width: 240, height: 200}}
                dropdownTextStyle={{fontSize: 20}}
                onSelect={dropdownSelect}
              />))}
        />
        <View style={{paddingLeft: 10, paddingRight: 10}}>
          <Button
            loading={loading}
            title="绑定"
            disabled={!workbenchOptions.length}
            onPress={handleBind}/>
        </View>
      </View>
    </Overlay>
  )
}
