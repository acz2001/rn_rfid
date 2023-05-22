/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from "react"
import type { PropsWithChildren } from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  NativeModules,
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  StyleProp,
} from "react-native"

import {
  Colors,
  Header,
} from "react-native/Libraries/NewAppScreen"

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const [value, setValue] = useState(0)

  const testModule = () => {
    const { RFID } = NativeModules || {}
    // console.log(`NativeModules===`, NativeModules)
    RFID.create("sld:///dev/ttyS6", (s: any) => {
      console.log("success ===", s)
      setValue(s)
    }, (err: any) => {
      console.log(`error ===`, err)
      setValue(err)
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
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.btn}>
            <Button title="测试" onPress={testModule} />
          </View>
          <View>
            <Text>读取值：{value}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles:Record<string, StyleProp<any>> = StyleSheet.create({
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
  btn: {
    width: 100,
    textAlign: "center",
  },
})

export default App
