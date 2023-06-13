import React, {useEffect, useState} from "react"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ScreenItemType, StackType} from "@/route/type"
import {StacksList} from "@/route/stacks"
import {useNavigation} from "@react-navigation/native"
import {getStorageToken} from "@/utils"
import {useToast} from "react-native-toast-notifications"
import {TOAST_DURATION} from "@/global/constants"

const Stack: StackType = createNativeStackNavigator()
const {Navigator: StackNavigator, Screen: StackScreen} = Stack

export function StackScreens(): React.ReactElement | null {

  const Toast = useToast()
  const [routeName, setRouteName] = useState<string>("Home")
  const {navigate} = useNavigation()

  useEffect(() => {
    getStorageToken().then(t => {
      if (!t) {
        Toast.show("请先登录", {duration: TOAST_DURATION})
        navigate("Login" as never)
        setRouteName("Login")
      }
    })
  }, [])

  if (!StacksList.length) return null
  return (
    <StackNavigator initialRouteName={routeName}>
      {StacksList.map((item: ScreenItemType) => <StackScreen key={item.name} {...item}/>)}
    </StackNavigator>
  )
}
