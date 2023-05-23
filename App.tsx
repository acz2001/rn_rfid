/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  AppState,
  NativeModules,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  AppStateStatus, NativeEventEmitter,
} from "react-native"

import {
  Colors,
  Header,
} from "react-native/Libraries/NewAppScreen"

const {RFID: RFIDApplication} = NativeModules || {}

function App(): JSX.Element {

  const [open, setOpen] = useState<boolean>(false)
  const [errorValue, setError] = useState(null)
  const [readerInfo, setReaderInfo] = useState<string>("")

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log(`AppStateStatus:nextAppState ===`, nextAppState)
      if (nextAppState === "inactive" || nextAppState === "background") {
        // 应用退出或直接关闭的逻辑处理
        // 在这里执行你想要的操作，例如保存数据或清理资源
      }
    }
    AppState.addEventListener("change", handleAppStateChange)

    const eventEmitter: NativeEventEmitter = new NativeEventEmitter(RFIDApplication)
    eventEmitter.addListener("tagReadData", (event: any) => {
      console.log(`tagReadData===`, event)
    })
    return () => {
      eventEmitter.removeAllListeners("tagReadData")
    }
  }, [])

  const testCreate = () => {
    console.log(`RFIDApplication===`, RFIDApplication)
    RFIDApplication.create("sld:///dev/ttyS6", (s: boolean) => {
      console.log("create:success ===", s)
      setOpen(s)
    }, (err: any) => {
      console.log(`create:error ===`, err)
      setError(err)
    })
  }

  const testShutdown = () => {
    RFIDApplication.shutdown((s: boolean) => {
      console.log(`shutdown:success === `, s)
      setOpen(s)
      setReaderInfo("")
    }, (err: any) => {
      console.log(`shutdown:error ===`, err)
      setError(err)
    })
  }

  const getReaderInfo = () => {
    // RFIDApplication.testEmit()
    RFIDApplication.getReaderInfo((info: any) => {
      console.log(`getReaderInfo:success === `, info)
      setReaderInfo(JSON.stringify(info))
    }, (err: any) => {
      console.log(`getReaderInfo:error ===`, err)
      setError(err)
    })
  }

  const testStartRead = () => {
    RFIDApplication.startRead((msg: any) => {
      console.log(`startRead:success === `, msg)
    }, (err: any) => {
      console.log(`startRead:error ===`, err)
      setError(err)
    })
  }

  const testStopRead = () => {
    RFIDApplication.startRead((msg: any) => {
      console.log(`stopRead:success === `, msg)
    }, (err: any) => {
      console.log(`stopRead:error ===`, err)
      setError(err)
    })
  }

  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <Header/>
        <View style={{backgroundColor: Colors.white}}>
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
              <Button disabled={!open} title="盘点" onPress={testStartRead}/>
            </View>
            <View style={styles.btn1}>
              <Button disabled={!open} title="断开" onPress={testStopRead}/>
            </View>
          </View>
          <View>
            <Text>串口号：sld:///dev/ttyS6</Text>
            <Text>当前连接状态：{open ? "已连接" : "未连接"}</Text>
            <Text>设备信息：{readerInfo}</Text>
          </View>
          <View>
            <Text>错误信息：{errorValue}</Text>
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

export default App
