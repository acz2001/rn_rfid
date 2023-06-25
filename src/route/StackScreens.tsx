import React, {useEffect} from "react"
import {StacksList} from "@/route/stacks"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ScreenItemType, StackType} from "@/route/type"
import {useRecoilState, useSetRecoilState} from "recoil"
import {UserInfoState, WorkbenchBindInfo} from "@/global/state"
import DeviceInfo from "react-native-device-info"
import {getStorageUserInfo} from "@/global"

const Stack: StackType = createNativeStackNavigator()
const {Navigator: StackNavigator, Screen: StackScreen} = Stack

export function StackScreens(): React.ReactElement {

  const setBindInfo = useSetRecoilState(WorkbenchBindInfo)
  const [userInfo, setUserInfo] = useRecoilState(UserInfoState)

  useEffect(() => {
    DeviceInfo.getUniqueId().then((deviceId: any) => setBindInfo({deviceId}))
    !userInfo && setUserInfo(getStorageUserInfo())
  }, [userInfo])

  return (
    <StackNavigator>
      {StacksList.map((item: ScreenItemType) => <StackScreen key={item.name} {...item}/>)}
    </StackNavigator>
  )
}
