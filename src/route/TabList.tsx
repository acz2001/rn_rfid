import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React from "react"
import {
  BottomTabType,
  ScreenBottomTabItemType,
  ScreenBottomTabsType,
} from "@/route/type"


const Tabs: BottomTabType = createBottomTabNavigator()
const {Navigator: TabsNavigator, Screen: TabsScreen} = Tabs

export const TabsScreens: ScreenBottomTabsType = []

export function TabList(): React.ReactElement | null {
  if (!TabsScreens.length) return null
  return (
    <TabsNavigator initialRouteName="Test">
      {TabsScreens.map((item: ScreenBottomTabItemType) => <TabsScreen key={item.navigationKey} {...item}/>)}
    </TabsNavigator>
  )
}
