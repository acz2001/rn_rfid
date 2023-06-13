import React, {forwardRef, ReactElement, useEffect, useState} from "react"
import {NativeModules, View} from "react-native"
import {Button, Input} from "@rneui/base"
import ModalDropdown from "react-native-modal-dropdown"
import {useRecoilState} from "recoil"
import {DeviceConnectState, DeviceReaderInfoState} from "@/global/state"
import {useToast} from "react-native-toast-notifications"
import {TOAST_DURATION} from "@/global/constants"
import {powerOptions} from "@/views/settings/types"

const {RFID: RFIDApplication = {}} = NativeModules

export default function SetPower(): ReactElement {

  const Toast = useToast()
  const [p, setP] = useState<number>()
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [deviceInfo, setDeviceInfo] = useRecoilState(DeviceReaderInfoState)
  const onSelectedItemsChange = (index: any, option: any) => {
    console.log(option)
    setP(Number(option))
  }

  const getPower = () => {
    if (!open) return
    RFIDApplication.getReaderInfo((info: any): void => {
      console.log(`getReaderInfo:success === `, info)
      // Toast.show("获取成功")
      setDeviceInfo(info)
    }, (err: any): void => {
      Toast.show("设备未连接", {duration: TOAST_DURATION})
      console.error(`getReaderInfo:error ===`, err)
    })
  }

  useEffect(() => {
    getPower()
  }, [])

  const setPower = () => {
    RFIDApplication.setReadPower(p, (info: any): void => {
      console.log(`getReaderInfo:success === `, info)
      Toast.show("设置成功", {duration: TOAST_DURATION})
      getPower()
      // setReaderInfo(info)
    }, (err: any): void => {
      Toast.show("设置失败" + err,{duration: TOAST_DURATION})
      console.error(`getReaderInfo:error ===`, err)
    })
  }

  return (<View style={{flex: 1}}>
    <View style={{width: 300}}>
      <Input
        inputContainerStyle={{width: 400}}
        label="功率"
        labelStyle={{color: "#000"}}
        InputComponent={
          forwardRef((props, ref) => (
            <ModalDropdown
              style={{backgroundColor: "white", flex: 1, padding: 2}}
              defaultValue={`${p || deviceInfo?.power || "未连接设备"}`}
              animated={false}
              textStyle={{fontSize: 30, color: "#000"}}
              options={powerOptions}
              dropdownStyle={{width: 300, height: 300}}
              dropdownTextStyle={{fontSize: 20}}
              onSelect={onSelectedItemsChange}
            />))}
      />
      <View style={{flexDirection: "row", width: 400, justifyContent: "space-between"}}>
        <View style={{width: 100}}>
          <Button disabled={!open} title="获取" onPress={getPower}/>
        </View>
        <View style={{width: 100}}>
          <Button disabled={!open} title="设置" onPress={setPower}/>
        </View>
      </View>
    </View>
  </View>)
}
