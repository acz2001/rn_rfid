import React, {ReactElement, useState} from "react"
import {SettingOpts} from "./SettingOpts"
import {SettingContainer} from "./SettingContainer"
import {View} from "react-native"


export function SystemSetting(): ReactElement {

  const [key, setKey] = useState<string>("create")

  return <View style={{flexDirection: "row"}}>
    <View>
      <SettingOpts defaultActiveKey={key} onChange={setKey}/>
    </View>
    <SettingContainer defaultActiveKey={key}/>
  </View>
}
