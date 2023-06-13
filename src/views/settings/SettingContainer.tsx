import React, {ReactElement} from "react"
import {Text} from "@rneui/base"
import {View} from "react-native"
import SetPower from "@/views/settings/options/SetPower"
import SetConnect from "@/views/settings/options/SetConnect"

export function SettingContainer({defaultActiveKey = "create"}: any): ReactElement {

  const sideTabNode: Record<string, ReactElement> = {
    create: <SetConnect/>,
    power: <SetPower/>,
    ant: <Text>天线</Text>,
  }

  return (<View style={{flex: 1, padding: 8}}>
    {sideTabNode[defaultActiveKey]}
  </View>)
}
