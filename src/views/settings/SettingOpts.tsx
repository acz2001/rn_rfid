import React, {ReactElement} from "react"
import {ScrollView, StyleSheet, TouchableHighlight} from "react-native"
import {SettingOptItem, SettingOptProps, settingOpts} from "./types"
import {ListItem, Text} from "@rneui/base"

export function SettingOpts({onChange, defaultActiveKey = "create"}: SettingOptProps): ReactElement {

  return (<ScrollView style={{flexGrow: 1, width: 200}}>
    {settingOpts.map((item: SettingOptItem) => (
      <ListItem
        key={item.key}
        Component={TouchableHighlight}
        containerStyle={defaultActiveKey === item.key ? {...styles.activeItem, height: 50} : {height: 50}}
        onPress={() => onChange && onChange(item.key)}
        pad={20}
        bottomDivider
      >
        <ListItem.Content>
          <ListItem.Title>
            <Text>{item.name}</Text>
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron/>
      </ListItem>
    ))}
  </ScrollView>)
}


const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: "#bdbdbd",
  },
})
