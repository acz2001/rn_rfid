import React from "react"
import {RecoilRoot} from "recoil"
import {NavigationContainer} from "@react-navigation/native"
import {StackList, TabList} from "@/route"

function App(): React.ReactElement {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <StackList/>
        <TabList/>
      </NavigationContainer>
    </RecoilRoot>
  )
}

export default App
