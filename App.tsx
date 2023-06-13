import React, {ReactElement} from "react"
import {RecoilRoot} from "recoil"
import {ToastProvider} from "react-native-toast-notifications"
import {NavigationContainer} from "@react-navigation/native"
import {StackScreens, TabBottoms} from "@/route"
import DrawerLayout from "@/components/DrawerLayout"

function App(): ReactElement {

  return (
    <RecoilRoot>
      <ToastProvider>
        <NavigationContainer>
          <DrawerLayout>
            <StackScreens/>
            <TabBottoms/>
          </DrawerLayout>
        </NavigationContainer>
      </ToastProvider>
    </RecoilRoot>
  )
}

export default App
