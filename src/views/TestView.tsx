import React, {useEffect, useState} from "react"
import {
  AppState,
  AppStateStatus,
  Button, NativeEventEmitter, NativeModules,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native"

const {RFID: RFIDApplication = {}} = NativeModules

export default function TestView(): React.ReactElement {

  const [open, setOpen] = useState<boolean>(false)
  const [isRead, setRead] = useState<boolean>(false)
  const [errorValue, setError] = useState(null)
  const [readerInfo, setReaderInfo] = useState<string>("")
  const [tagInfo, setTagInfo] = useState<any>()

  const {width, height} = useWindowDimensions()

  const handleAppStateChange = (nextAppState: AppStateStatus): void => {
    console.log(`AppStateStatus:nextAppState ===`, nextAppState)
    // active 处于窗口
    // background 返回或退出
  }

  useEffect(() => {
    console.log(`窗口宽：${width}、窗口高：${height}`) // width:960, height:540
    AppState.addEventListener("change", handleAppStateChange)
    const eventEmitter: NativeEventEmitter = new NativeEventEmitter(RFIDApplication)
    eventEmitter.addListener("tagReadData", (event: any): void => {
      console.log(`tagReadData===`, event)
      setTagInfo(event)
    })
    return (): void => {
      eventEmitter.removeAllListeners("tagReadData")
    }
  }, [])

  const testCreate = (): void => {
    console.log(`RFIDApplication===`, RFIDApplication)
    RFIDApplication.create("sld:///dev/ttyS6", (s: boolean): void => {
      console.log("create:success ===", s)
      setOpen(s)
    }, (err: any): void => {
      console.error(`create:error ===`, err)
      setError(err)
    })
  }

  const testShutdown = (): void => {
    RFIDApplication.shutdown((s: boolean): void => {
      console.log(`shutdown:success === `, s)
      setOpen(s)
      setReaderInfo("")
    }, (err: any): void => {
      console.error(`shutdown:error ===`, err)
      setError(err)
    })
  }

  const getReaderInfo = (): void => {
    RFIDApplication.getReaderInfo((info: any): void => {
      console.log(`%c getReaderInfo:success === `, info, "color:#1ed76d")
      setReaderInfo(JSON.stringify(info))
    }, (err: any): void => {
      console.error(`getReaderInfo:error ===`, err)
      setError(err)
    })
  }

  const testStartRead = (): void => {
    RFIDApplication.startRead((msg: any): void => {
      console.log(`startRead:success === `, msg)
      setRead(true)
    }, (err: any): void => {
      console.error(`startRead:error ===`, err)
      setError(err)
    })
  }

  const testStopRead = (): void => {
    RFIDApplication.stopRead((msg: any): void => {
      console.log(`stopRead:success === `, msg)
      setRead(false)
    }, (err: any): void => {
      console.error(`stopRead:error ===`, err)
      setError(err)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={{marginTop: 60}}>
          <View style={styles.btnBox}>
            <View style={styles.btn}>
              <Button disabled={open} title="测试连接" onPress={testCreate}/>
            </View>
            <View style={styles.btn1}>
              <Button disabled={!open} title="测试关闭" onPress={testShutdown}/>
            </View>
            <View style={styles.btn1}>
              <Button disabled={!open} title="获取设备信息" onPress={getReaderInfo}/>
            </View>
            <View style={styles.btn1}>
              <Button disabled={isRead || !open} title="盘点" onPress={testStartRead}/>
            </View>
            <View style={styles.btn1}>
              <Button disabled={!open} title="断开" onPress={testStopRead}/>
            </View>
          </View>
          <View>
            <Text>设备窗口宽：{width}、窗口高：{height}</Text>
            <Text>串口号：sld:///dev/ttyS6</Text>
            <Text>当前连接状态：{open ? "已连接" : "未连接"}</Text>
            <Text>设备信息：{readerInfo}</Text>
            <Text>错误信息：{errorValue}</Text>
            <Text>标签信息：{JSON.stringify(tagInfo)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
