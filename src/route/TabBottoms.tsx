import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import {
  BottomTabType,
  ScreenBottomTabItemType,
} from "@/route/type"
import {TabsScreens} from "@/route/tabs"

const Tabs: BottomTabType = createBottomTabNavigator()
const {Navigator: TabsNavigator, Screen: TabsScreen} = Tabs

export function TabBottoms(): React.ReactElement | null {
  if (!TabsScreens.length) return null
  return (
    <TabsNavigator initialRouteName="Test">
      {TabsScreens.map((item: ScreenBottomTabItemType) => <TabsScreen key={item.navigationKey} {...item}/>)}
    </TabsNavigator>
  )
}
