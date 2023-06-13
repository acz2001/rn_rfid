import React, {forwardRef, ReactElement, useEffect, useState} from "react"
import {Button, Dialog, Input, ListItem, Text} from "@rneui/base"
import {GestureResponderEvent, StyleProp, TouchableHighlight, View, ViewStyle} from "react-native"
import {DialogProps} from "@rneui/base/dist/Dialog/Dialog"
import {DialogLoadingProps} from "@rneui/base/dist/Dialog/Dialog.Loading"
import {DialogActionsProps} from "@rneui/base/dist/Dialog/Dialog.Actions"
import Dropdown from "react-native-modal-dropdown"
import {getStorageUserInfo, storage} from "@/utils"
import {getWorkbenchList, WorkbenchParam} from "@/api/task/workbench"
import {useToast} from "react-native-toast-notifications"
import {Workbench} from "@/views/home/types"
import workType from "@/wokeType.json"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {TOAST_DURATION} from "@/global/constants"

interface CreateTaskProps extends DialogProps, DialogLoadingProps, DialogActionsProps {
  onConfirm: (val: any) => void;
  confirmButtonStyle?: StyleProp<ViewStyle>;
  cancelButtonStyle?: StyleProp<ViewStyle>;
  onCancel: (event: GestureResponderEvent) => void;
  contentHeight?: number;
}

export default function CreateTaskDialog(
  {
    onConfirm,
    onCancel,
    confirmButtonStyle,
    cancelButtonStyle,
    contentHeight = 240,
    ...props
  }
    : CreateTaskProps,
): ReactElement {

  const Toast = useToast()
  const [workbenchOptions, setWorkbenchOptions] = useState<Array<Workbench>>([])
  const [defaultValue, setDefaultValue] = useState<string>()
  const [selectWorkbench, setSelectWorkbench] = useState()

  const [workNumber, setWorkNumber] = useState<string>()

  const [selectWorkType, setWorkType] = useState()
  const [defaultWorkType, setDefaultWorkType] = useState()

  const [memberList, setMemberList] = useState<any>([])


  const getWorkbench = async () => {
    try {
      const userInfo = await getStorageUserInfo()
      const {data, success} = await getWorkbenchList({
        organizationId: userInfo?.workerProfile?.organizationId as string,
      })
      if (!success) return
      setWorkbenchOptions(data.content)
      console.log(`getWorkbench===`, data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getWorkbench()
    // console.log(workType)
  }, [])

  const dropdownSelect = (index: any, opt: any) => {
    setDefaultValue(opt.name)
    setSelectWorkbench(opt)
    console.log(`工作台`, opt)
  }

  const workTypeSelect = (index: any, opt: any) => {
    setDefaultWorkType(opt.name)
    setWorkType(opt)
    console.log(`工种`, opt)
  }

  const addWorkItem = (param: any) => {
    if (memberList.some((i: any) => i.workNumber === param.workNumber)) {
      Toast.show("该员工已添加", {duration: TOAST_DURATION})
      return
    }
    const list = [param]
    setMemberList([...memberList, ...list])
  }
  return (
    <Dialog overlayStyle={{backgroundColor: "white"}} {...props}>
      <Dialog.Title title="新建任务"/>
      <View style={{height: contentHeight}}>
        <Input
          inputContainerStyle={{width: 200}}
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
                textStyle={{fontSize: 26}}
                options={workbenchOptions}
                renderRow={(option: Workbench) => <Text style={{fontSize: 22}}>{option.name}</Text>}
                renderButtonText={(option: any) => option.name}
                dropdownStyle={{width: 200, height: 200}}
                dropdownTextStyle={{fontSize: 20}}
                onSelect={dropdownSelect}
              />))}
        />
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
              disabled={memberList.length === 3}
              title="添加"
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
        <View style={{flex: 1, flexDirection: "row"}}>
          <Text>已选择员工：</Text>
          {memberList.map((item: any, i: number) => (
            <Text key={item.workNumber}>
              {`${item.workNumber}(${item.workTypeName})`}
              {<FontAwesome onPress={() => {
                const list = [...memberList]
                list.splice(i, 1)
                setMemberList([...list])
              }} name="close" size={20}/>}
              、
            </Text>
          ))}
        </View>
      </View>
      <Dialog.Actions>
        <View style={confirmButtonStyle}>
          <Button title="新建" onPress={() => onConfirm({
            // @ts-ignore
            workbenchId: selectWorkbench?.workbenchId,
            // @ts-ignore
            workbenchName: selectWorkbench?.name,
            memberList,
          })}/>
        </View>
        <View style={cancelButtonStyle}>
          <Button color="#ccc" title="取消" onPress={onCancel}/>
        </View>
      </Dialog.Actions>
    </Dialog>
  )
}
