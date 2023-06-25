import React, {ReactElement, useEffect} from "react"
import {RecoilRoot} from "recoil"
import {ToastProvider} from "react-native-toast-notifications"
import {NavigationContainer} from "@react-navigation/native"
import {StackScreens, TabBottoms} from "@/route"
import Drawer from "@/components/Drawer"
import {storage} from "@/global"
import {initializeMMKVFlipper} from "react-native-mmkv-flipper-plugin"


function App(): ReactElement {

  if (__DEV__) {
    initializeMMKVFlipper({default: storage})
  }

  return (
    <RecoilRoot>
      <ToastProvider>
        <NavigationContainer>
          <Drawer>
            <StackScreens/>
            <TabBottoms/>
          </Drawer>
        </NavigationContainer>
      </ToastProvider>
    </RecoilRoot>
  )
}

export default App
