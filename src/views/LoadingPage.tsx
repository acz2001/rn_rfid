import React, {useEffect} from "react"
import {ActivityIndicator, View} from "react-native"
import {ScreenNavigationProps} from "@/route"
import {getStorageToken} from "@/global"


export default function LoadingPage({navigation}: ScreenNavigationProps): React.ReactElement {

  useEffect(() => {
    if (getStorageToken()) {
      console.log(`已登录`)
      navigation.replace("Home")
    } else {
      console.log(`未登录`)
      navigation.replace("Login")
    }
  }, [])

  return (<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size={108}/>
  </View>)
}
