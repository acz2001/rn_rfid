import React, {ReactElement, useEffect, useState} from "react"
import {
  AppState,
  AppStateStatus,
  Button,
  NativeEventEmitter,
  NativeModules, StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native"
import {useRecoilState} from "recoil"
import {DeviceConnectState, DeviceReaderInfoState, DeviceReadState} from "@/global/state"
import {useToast} from "react-native-toast-notifications"
import {CONNECT_SLD, TOAST_DURATION} from "@/global/constants"

const {RFID: RFIDApplication = {}} = NativeModules

export default function SetConnect(): ReactElement {

  const Toast = useToast()
  const [open, setOpen] = useRecoilState(DeviceConnectState)
  const [isRead, setRead] = useRecoilState(DeviceReadState)
  const [errorValue, setError] = useState(null)
  const [tagInfo, setTagInfo] = useState<any>()
  const {width, height} = useWindowDimensions()

  // const handleAppStateChange = (nextAppState: AppStateStatus): void => {
  //   console.log(`AppStateStatus:nextAppState ===`, nextAppState)
  //   // active 处于窗口
  //   // background 返回或退出
  // }

  useEffect(() => {
    // console.log(`窗口宽：${width}、窗口高：${height}`) // width:960, height:540
    // AppState.addEventListener("change", handleAppStateChange)
    const eventEmitter: NativeEventEmitter = new NativeEventEmitter(RFIDApplication)
    eventEmitter.addListener("tagReadData", (event: any): void => {
      console.log(`tagReadData===`, event)
      setTagInfo(event)
    })
    return (): void => {
      eventEmitter.removeAllListeners("tagReadData")
    }
  }, [])

  const testStartRead = (): void => {
    RFIDApplication.startRead((msg: any): void => {
      setRead(true)
    }, (err: any): void => {
      setError(err)
    })
  }

  const testStopRead = (): void => {
    RFIDApplication.stopRead((msg: any): void => {
      setRead(false)
    }, (err: any): void => {
      setError(err)
    })
  }

  const testCreate = (): void => {
    RFIDApplication.create(CONNECT_SLD, (s: boolean): void => {
      setOpen(true)
      Toast.show("连接成功", {duration: TOAST_DURATION})
      if (s) testStartRead()
    }, (err: any): void => {
      Toast.show(err, {duration: TOAST_DURATION})
      setError(err)
    })
  }

  const testShutdown = (): void => {
    RFIDApplication.shutdown((s: boolean): void => {
      setOpen(s)
      Toast.show("关闭成功", {duration: TOAST_DURATION})
      if (s) testStopRead()
    }, (err: any): void => {
      Toast.show(err, {duration: TOAST_DURATION})
      setError(err)
    })
  }

  return (
    <View>
      <View style={styles.btnBox}>
        <View style={styles.btn}>
          <Button disabled={open} title="连接" onPress={testCreate}/>
        </View>
        <View style={styles.btn1}>
          <Button disabled={!open} title="断开连接" onPress={testShutdown}/>
        </View>
      </View>
      <View>
        <Text>设备窗口宽：{width}、窗口高：{height}</Text>
        <Text>串口号：sld:///dev/ttyS6</Text>
        <Text>当前连接状态：{open ? "已连接" : "未连接"}</Text>
        <Text>错误信息：{errorValue}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
  btnBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  btn: {
    width: 100,
    textAlign: "center",
  },
  btn1: {
    width: 100,
    textAlign: "center",
    marginLeft: 10,
  },
})
