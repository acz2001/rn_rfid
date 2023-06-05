import React from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ScreenItemType, StackType, ScreensType} from "@/route/type"
import {NativeStackNavigatorProps} from "react-native-screens/lib/typescript/native-stack/types"
import TestView from "@/views/TestView"

const Stack: StackType = createNativeStackNavigator()
const {Navigator: StackNavigator, Screen: StackScreen} = Stack

export const StackScreens: ScreensType = [
  {
    name: "Test",
    component: TestView,
    options: {},
    navigationKey: "Test",
  },
]

export function StackList({...props}: NativeStackNavigatorProps): React.ReactElement | null {
  if (!StackScreens.length) return null
  return (
    <StackNavigator {...props}>
      {StackScreens.map((item: ScreenItemType) => <StackScreen key={item.name} {...item}/>)}
    </StackNavigator>
  )
}
