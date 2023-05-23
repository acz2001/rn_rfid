/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from "react"
import type {PropsWithChildren} from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  AppState,
  NativeModules,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  StyleProp, AppStateStatus,
} from "react-native"

import {
  Colors,
  Header,
} from "react-native/Libraries/NewAppScreen"

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const {RFID: RFIDApplication} = NativeModules || {}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [value, setValue] = useState(0)
  const [errorValue, setErrorValue] = useState(null)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      console.log(`AppStateStatus:nextAppState ===`, nextAppState)
      if (nextAppState === "inactive" || nextAppState === "background") {
        // 应用退出或直接关闭的逻辑处理
        // 在这里执行你想要的操作，例如保存数据或清理资源
      }
    }
    AppState.addEventListener("change", handleAppStateChange)
    return () => {
      // AppState.removeEventListener("change", handleAppStateChange)
    }
  }, [])

  const testCreate = () => {
    console.log(`RFIDApplication===`, RFIDApplication)
    RFIDApplication.create("sld:///dev/ttyS6", (s: any) => {
      console.log("create:success ===", s)
      setValue(s)
    }, (err: any) => {
      console.log(`create:error ===`, err)
      setErrorValue(err)
    })
  }

  const testShutdown = () => {
    RFIDApplication.shutdown("断开连接", (s: boolean) => {
      console.log(`shutdown:success === `, s)
    }, (err: any) => {
      console.log(`shutdown:error ===`, err)
      setErrorValue(err)
    })
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header/>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.btnBox}>
            <View style={styles.btn}>
              <Button title="测试连接" onPress={testCreate}/>
            </View>
            <View style={styles.btn1}>
              <Button title="测试关闭" onPress={testShutdown}/>
            </View>
          </View>
          <View>
            <Text>当前串口号：sld:///dev/ttyS6</Text>
          </View>
          <View>
            <Text>错误信息：{errorValue}</Text>
          </View>
          <View>
            <Text>当前连接串口：{value}</Text>
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
